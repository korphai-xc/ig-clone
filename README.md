# Instagram Clone Web Application

A modern, responsive Instagram clone built with Next.js, featuring infinite scrolling, API integration, and Material-UI design. This project demonstrates full-stack development with TypeScript, featuring a dog-themed content feed using the Dog CEO API.

## ✨ Features

### Core Features
- 📱 **Responsive Design** - Mobile-first approach with Material-UI
- 🔄 **Infinite Scrolling** - Smooth content loading with IntersectionObserver
- 🔍 **Search Box** - UI ready for content search functionality
- 🎨 **Theme System** - Dark/light mode support

### Technical Features
- ⚡ **Next.js 15** - Latest App Router with Server Components
- 🎯 **TypeScript** - Full type safety throughout the application
- 🎨 **Material-UI** - Modern component library with custom theming
- 🔄 **Jotai State Management** - Lightweight global state solution
- 📡 **API Integration** - RESTful API with external service integration
- 🧪 **Mock Data** - Realistic content generation for development

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Material-UI (MUI) + Emotion
- **State Management**: Jotai
- **Build Tool**: Turbopack (Next.js built-in)

### Backend
- **API Routes**: Next.js API Routes
- **External API**: Dog CEO API (https://dog.ceo/api/)
- **Data Format**: RESTful JSON API

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier (via ESLint)
- **Type Checking**: TypeScript Compiler

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ig-clone
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Additional commands
pnpm dev --turbo  # Explicit Turbopack usage
```

## 📁 Project Structure

```
ig-clone/
├── public/                  # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── *.svg
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API Routes
│   │   ├── favicon.ico
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   └── store/               # Global state
├── .gitignore               # Git ignore rules
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── pnpm-lock.yaml           # pnpm lock file
├── postcss.config.mjs       # PostCSS configuration
├── tailwindcss.config.*     # Tailwind CSS config
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration options
};

export default nextConfig;
```

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking enabled
- Path mapping for clean imports
- Modern ESNext target

### ESLint Configuration (`eslint.config.mjs`)
- Next.js recommended rules
- TypeScript integration
- Custom formatting rules

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🧪 Development Notes

### API Integration
- **Dog CEO API**: External API for random dog images
- **Mock Data**: Realistic user data and content generation
- **Error Handling**: Graceful degradation on API failures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint for code formatting
- Maintain component composition patterns
- Write descriptive commit messages

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Material-UI](https://mui.com/) - React component library
- [Dog CEO API](https://dog.ceo/dog-api/) - Dog images API
- [Jotai](https://jotai.org/) - State management library

---

**Happy coding! 🐶📸**