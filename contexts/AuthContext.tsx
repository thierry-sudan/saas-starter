'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserData {
  email: string;
  firstName?: string;
  lastName?: string;
  provider?: 'google' | 'email';
  currency?: 'EUR' | 'USD';
  plan: 'free' | 'simple' | 'premium' | 'pro';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'trialing';
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (firstName: string, lastName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      provider: 'email',
      plan: 'free',
      createdAt: new Date(),
    });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    
    // Extraire le nom depuis Google
    const displayName = user.displayName || '';
    const nameParts = displayName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Vérifier si l'utilisateur existe déjà dans Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Créer le document utilisateur s'il n'existe pas
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        firstName,
        lastName,
        provider: 'google',
        plan: 'free',
        createdAt: new Date(),
      });
    } else {
      // Mettre à jour firstName et lastName si vides
      const userData = userDoc.data();
      const updates: any = {};
      
      if (!userData.firstName && !userData.lastName && (firstName || lastName)) {
        updates.firstName = firstName;
        updates.lastName = lastName;
      }
      
      // Ajouter le provider si pas déjà défini
      if (!userData.provider) {
        updates.provider = 'google';
      }
      
      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, 'users', user.uid), updates);
      }
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfile = async (firstName: string, lastName: string) => {
    if (!user) throw new Error('Non authentifié');
    
    await updateDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
    });
    
    // Mettre à jour l'état local
    if (userData) {
      setUserData({
        ...userData,
        firstName,
        lastName,
      });
    }
  };

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
