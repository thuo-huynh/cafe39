# Cafe39 - Modern Web Application

A modern, internationalized web application built with Next.js 15 and React 19, featuring a beautiful UI powered by Radix UI components and Tailwind CSS.

## Scan

![Cafe39 Menu](/public/menu.jpg)

## 🚀 Features

- **Modern Stack**: Built with Next.js 15 (App Router) and React 19
- **Type Safety**: Full TypeScript support
- **Internationalization**: Multi-language support using next-intl
- **Beautiful UI Components**: Integrated Radix UI primitives
- **Theming**: Dark/Light mode support with next-themes
- **Animations**: Smooth animations with Framer Motion
- **Loading States**: Beautiful loading states with nextjs-toploader
- **Styling**: Modern styling with Tailwind CSS and CSS animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript 5
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.5.0
- **State Management**: React Server Components
- **Package Manager**: pnpm
- **Development Tools**: Turbopack

## 📦 Project Structure

```
src/
├── app/                   # Next.js app directory
│   ├── [locale]/         # Internationalized routes
│   ├── fonts/           # Custom fonts
│   └── globals.css      # Global styles
├── components/           # Reusable UI components
├── constants/            # Application constants
├── data/                # Static data and configurations
├── enum/                # TypeScript enums
├── i18n/                # Internationalization config
├── lib/                 # Utility functions and shared logic
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd cafe39
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

## 🎨 UI Components

The application uses Radix UI primitives for accessible, unstyled components:

- Dialog
- Dropdown Menu
- Radio Group
- Scroll Area
- Select
- Separator
- Tabs
- And more...

## 🌐 Internationalization

The application supports multiple languages using `next-intl`. Language configurations can be found in the `messages/` directory.

## 🎭 Theming

Dark and light mode support is implemented using `next-themes`. The theme can be toggled using the built-in theme switcher.

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - UI components configuration

## 📱 Performance

The application is optimized for performance:

- Uses React Server Components where possible
- Implements proper code splitting
- Optimizes images and assets
- Utilizes Turbopack for faster development builds

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.
