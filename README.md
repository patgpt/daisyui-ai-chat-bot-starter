# AI Chat Starter

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.46-5A0EF8?style=flat-square&logo=daisyui)](https://daisyui.com/)
[![Motion](https://img.shields.io/badge/Motion-12.23.3-FF6B6B?style=flat-square)](https://motion.dev/)
[![CVA](https://img.shields.io/badge/CVA-0.7.1-4F46E5?style=flat-square)](https://cva.style/)

A modern, accessible AI chat application built with Next.js 15, featuring atomic design principles, motion animations, and a beautiful DaisyUI interface.

# You can just build things

![Rick](./public/rick.png)

## 🚀 Features

- **🤖 AI Chat Interface** - Powered by Groq API with streaming responses
- **🎨 Modern UI** - Beautiful, accessible components with DaisyUI
- **📱 Responsive Design** - Mobile-first with adaptive layouts
- **🎭 Smooth Animations** - Motion.create components throughout
- **🧩 Atomic Design** - Scalable component architecture
- **⚡ Type-Safe Variants** - CVA-powered component variants
- **♿ Accessibility First** - WCAG compliant with semantic HTML
- **🌙 Theme Support** - Built-in light/dark mode switching

## 📦 Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - Latest React with concurrent features

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI 5](https://daisyui.com/)** - Semantic component classes
- **[Class Variance Authority (CVA)](https://cva.style/)** - Type-safe component variants
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Intelligent class merging
- **[clsx](https://github.com/lukeed/clsx)** - Conditional class names

### Animation & Motion

- **[Motion](https://motion.dev/)** - Production-ready motion library
- **motion.create()** pattern for consistent animations

### AI & Chat

- **[@ai-sdk/react](https://sdk.vercel.ai/docs)** - React hooks for AI interactions
- **[@ai-sdk/groq](https://sdk.vercel.ai/providers/ai-sdk-providers/groq)** - Groq provider for fast inference
- **[ai](https://sdk.vercel.ai/)** - Vercel AI SDK core

### Utilities

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching
- **[react-icons](https://react-icons.github.io/react-icons/)** - Icon library

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/          # Chat API endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Chat page
├── components/            # Atomic Design Components
│   ├── atoms/             # Basic building blocks
│   │   ├── Button.client.tsx
│   │   ├── Input.client.tsx
│   │   ├── Link.client.tsx
│   │   └── index.ts       # Barrel exports
│   ├── molecules/         # Simple combinations
│   │   ├── Footer.client.tsx
│   │   └── index.ts
│   ├── organisms/         # Complex components
│   │   ├── Navbar.client.tsx
│   │   └── index.ts
│   ├── templates/         # Page layouts
│   │   └── index.ts
│   └── index.ts           # Main barrel export
├── styles/                # Styling utilities
│   ├── cn.ts             # Class name utility
│   ├── font.ts           # Font configurations
│   └── globals.css       # Global styles
└── utils/                 # Utility functions
    ├── cva.ts            # CVA utilities
    └── motion.ts         # Motion components
```

## 🎨 Design System

### Atomic Design Principles

Our component architecture follows [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology:

- **Atoms** - Basic building blocks (Button, Input, Link)
- **Molecules** - Simple combinations (Footer, SearchBox)
- **Organisms** - Complex components (Navbar, ChatArea)
- **Templates** - Page-level layouts
- **Pages** - Specific instances with real content

### Component Patterns

#### CVA Variants

All components use Class Variance Authority for type-safe variants:

```typescript
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

#### Motion.create Pattern

All atoms use `motion.create()` for consistent animations:

```typescript
const MotionButton = motion.create("button");

// Usage with motion props
<Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  Animated Button
</Button>
```

#### File Naming Convention

- **Client Components**: `ComponentName.client.tsx`
- **Server Components**: `ComponentName.tsx`
- **Types**: `ComponentName.types.ts`
- **Barrel Exports**: `index.ts`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Groq API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd r3f-landing-page

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local

# Start development server
bun dev
```

### Environment Variables

```bash
GROQ_API_KEY=your_groq_api_key_here
```

## 📚 Storybook

This project includes a comprehensive **Storybook** setup for component development, testing, and documentation.

### 🎨 Design System Documentation

Storybook serves as our living design system documentation, featuring:

- **Component Library** - All atoms, molecules, and organisms
- **Interactive Examples** - Live component playground
- **Theme Switching** - Test all 32 DaisyUI themes
- **Responsive Testing** - Mobile, tablet, and desktop viewports
- **Accessibility Testing** - Built-in a11y validation
- **Motion Showcase** - Animation demonstrations

### 🚀 Running Storybook

```bash
# Start Storybook development server
bun storybook

# Build Storybook for production
bun build-storybook
```

Storybook will be available at `http://localhost:6006`

### 🧩 Component Categories

#### 🔬 Atoms

- **Button** - Interactive elements with CVA variants
- **Input** - Form inputs with validation states
- **Link** - Navigation with Next.js integration

#### 🧬 Molecules

- **Footer** - Copyright and author information

#### 🦠 Organisms

- **Navbar** - Responsive navigation with mobile drawer

### 🎭 Interactive Features

#### Theme Switching

Use the theme selector in the Storybook toolbar to preview components across all DaisyUI themes:

- Light themes: light, cupcake, emerald, corporate, etc.
- Dark themes: dark, synthwave, dracula, night, etc.

#### Responsive Testing

Switch between viewport sizes to test responsive behavior:

- **Mobile**: 375px width
- **Tablet**: 768px width
- **Desktop**: 1440px width

#### Accessibility Testing

Built-in a11y addon automatically checks for:

- Color contrast ratios
- Keyboard navigation
- ARIA attributes
- Semantic HTML structure

### 🎯 Story Patterns

All stories follow consistent patterns:

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Component } from "./Component.client";

const meta = {
  title: "Atoms/Component",
  component: Component,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Component description...",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Component",
  },
};
```

### 📖 Auto-Generated Documentation

Storybook automatically generates documentation from:

- **TypeScript types** - Props and interfaces
- **TSDoc comments** - Component descriptions
- **Story descriptions** - Usage examples
- **CVA variants** - Available options

### 🧪 Testing Integration

Storybook integrates with our testing setup:

- **Vitest** - Unit tests for stories
- **Playwright** - E2E testing
- **Chromatic** - Visual regression testing

## 🔧 Development Guidelines

### Component Creation

1. **Create Atoms** with CVA variants and motion.create:

```typescript
"use client";

import { cva, type VariantProps } from "@/utils/cva";
import { motion } from "motion/react";

const MotionElement = motion.create("div");

const variants = cva("base-classes", {
  variants: { /* variants */ },
  defaultVariants: { /* defaults */ },
});

export interface Props extends VariantProps<typeof variants> {
  children: React.ReactNode;
}

export const Component: React.FC<Props> = ({ children, ...props }) => (
  <MotionElement className={variants(props)}>
    {children}
  </MotionElement>
);
```

2. **Use Barrel Exports** in each component directory
3. **Follow TypeScript strict mode** - no `any` types
4. **Include TSDoc comments** for all exported components
5. **Ensure accessibility** with semantic HTML and ARIA attributes

### Styling Guidelines

- **Use DaisyUI classes** for consistent theming
- **Prefer semantic colors** (`primary`, `secondary`) over hardcoded colors
- **Use CVA for variants** instead of conditional classes
- **Follow mobile-first** responsive design
- **No inline styles** - use Tailwind utilities

### Animation Guidelines

- **Use motion.create()** for all animated elements
- **Respect `prefers-reduced-motion`** - Motion handles this automatically
- **Use animation presets** from `@/utils/motion`
- **Keep animations subtle** and purposeful

## 🔌 API Routes

### Chat API (`/api/chat`)

Handles streaming chat responses using the Vercel AI SDK:

```typescript
// POST /api/chat
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}
```

Returns a streaming response with AI-generated content.

## 🎯 Utilities

### Class Name Utility (`cn`)

Combines `tailwind-merge` and `clsx` for intelligent class merging:

```typescript
import { cn } from "@/styles/cn";

const className = cn(
  "base-classes",
  condition && "conditional-classes",
  "override-classes",
);
```

### CVA Utilities

Centralized variant management:

```typescript
import { cva, type VariantProps } from "@/utils/cva";
```

### Motion Components

Pre-created motion components:

```typescript
import { MotionDiv, MotionButton, animationPresets } from "@/utils/motion";
```

## 📝 Contributing

1. Follow the established patterns and conventions
2. Ensure all components are accessible
3. Add TypeScript types for all props
4. Include TSDoc comments
5. Test components across different themes
6. Maintain atomic design principles

## 📄 License

This project is licensed under the MIT License.

---

**Created with ❤️ by [@AGIManifesto](https://github.com/AGIManifesto) in 🇨🇦 - 2025**
