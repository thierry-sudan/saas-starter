# Contributing Guide

Thank you for your interest in contributing to SaaS Starter! 🎉

## How to Contribute

### 1. Fork and Clone

```bash
# Fork the project on GitHub, then:
git clone https://github.com/thierry-sudan/saas-starter.git
cd saas-starter
npm install
```

### 2. Configuration

```bash
# Copy the environment file
cp .env.local.example .env.local

# Fill in with your Firebase and Stripe test credentials
```

### 3. Create a Branch

```bash
git checkout -b feature/my-new-feature
# or
git checkout -b fix/bug-fix
```

### 4. Develop

```bash
# Run in dev mode
npm run dev

# Test your changes on http://localhost:3000
```

### 5. Commit

Use clear commit messages:

```bash
git commit -m "feat: add Twitter authentication"
git commit -m "fix: resolve Stripe webhook bug"
git commit -m "docs: improve Firebase documentation"
```

**Commit Convention:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting, missing semicolons, etc.
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

### 6. Push and Pull Request

```bash
git push origin feature/my-new-feature
```

Then create a Pull Request on GitHub with:
- A clear title
- A description of what you changed
- Screenshots if relevant
- Reference to an issue if applicable

## What Can You Contribute?

### 🌟 Desired Features

- [ ] Authentication via other providers (Twitter, GitHub, etc.)
- [ ] Admin dashboard to manage users
- [ ] Custom webhook system
- [ ] Rate limiting per plan
- [ ] Analytics and usage tracking
- [ ] Notification system (email, SMS)
- [ ] Multi-language support (i18n)
- [ ] Team/organization mode
- [ ] Automatic API documentation (Swagger)
- [ ] Unit and E2E tests

### 🐛 Bug Fixes

If you find a bug, first create an issue on GitHub with:
- Problem description
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, etc.)

### 📚 Documentation

- Improve existing guides
- Add tutorials
- Translate documentation
- Add usage examples

### 🎨 Design

- Improve UI/UX
- Create themes
- Responsive design
- Accessibility (a11y)

## Code Standards

### TypeScript

- Use strict TypeScript
- Properly type props and functions
- Avoid `any` unless really necessary

### React

- Functional components with hooks
- Avoid unnecessary re-renders
- Use `use client` only when necessary

### Style

- Use Tailwind CSS
- Follow existing class conventions
- Mobile-first

### Structure

```
app/
  ├── (auth)/          # Authentication pages
  ├── api/             # API routes
  └── dashboard/       # Dashboard pages
components/            # Reusable components
contexts/             # React contexts
lib/                  # Utilities and configs
```

## Tests

Before submitting your PR:

```bash
# Check the build
npm run build

# Linter
npm run lint

# Tests (when implemented)
npm test
```

## Questions?

- Create an issue on GitHub
- Join the discussions
- Check the README.md

## Code of Conduct

Be respectful and constructive. This project is open-source and community-driven.

## License

By contributing, you agree that your contributions will be licensed under GPL 3.0

---

Thank you for your contribution! 🙏
