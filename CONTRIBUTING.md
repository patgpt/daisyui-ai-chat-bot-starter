# Contributing to AI Chat Starter

Thank you for your interest in contributing to AI Chat Starter! This guide will help you understand our development process, coding standards, and how to submit contributions.

## 🚀 Quick Start

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `bun install`
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** following our guidelines below
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

## 📋 Development Guidelines

### 🏗️ Atomic Design Principles

We follow strict atomic design methodology. Please ensure your components are placed in the correct category:

#### Atoms (`src/components/atoms/`)

- **Purpose**: Basic building blocks (Button, Input, Link, Icon)
- **Characteristics**:
  - Single responsibility
  - No business logic
  - Reusable across the entire application
  - Use `motion.create()` pattern
  - Include CVA variants

#### Molecules (`src/components/molecules/`)

- **Purpose**: Simple combinations of atoms (SearchBox, FormField, Card)
- **Characteristics**:
  - Combine 2-3 atoms
  - Simple, focused functionality
  - Reusable within similar contexts

#### Organisms (`src/components/organisms/`)

- **Purpose**: Complex components (Navbar, Header, ChatArea, Sidebar)
- **Characteristics**:
  - Combine molecules and atoms
  - Complex state management
  - Specific business logic

#### Templates (`src/components/templates/`)

- **Purpose**: Page-level layouts (PageLayout, ChatLayout, DashboardLayout)
- **Characteristics**:
  - Define page structure
  - No specific content
  - Reusable layout patterns

### 🎨 Component Standards

#### File Naming Convention

```
ComponentName.client.tsx    # Client components with interactivity
ComponentName.tsx           # Server components (RSC)
ComponentName.types.ts      # Type definitions
index.ts                    # Barrel exports
```

#### Component Structure Template

```typescript
"use client"; // Only if client-side features are needed

import { cva, type VariantProps } from "@/utils/cva";
import { motion } from "motion/react";
import React from "react";

// Motion component using motion.create pattern
const MotionElement = motion.create("div");

// CVA variants for type-safe styling
const componentVariants = cva(
  "base-classes", // Base DaisyUI classes
  {
    variants: {
      variant: {
        primary: "variant-primary-classes",
        secondary: "variant-secondary-classes",
      },
      size: {
        sm: "size-small-classes",
        md: "size-medium-classes",
        lg: "size-large-classes",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Props interface extending CVA variants
 */
export interface ComponentProps extends VariantProps<typeof componentVariants> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
}

/**
 * TSDoc comment describing the component
 * @remarks
 * - List key features
 * - Mention accessibility considerations
 * - Note any special behaviors
 */
export const Component: React.FC<ComponentProps> = ({
  children,
  variant,
  size,
  className,
  "aria-label": ariaLabel,
}) => {
  return (
    <MotionElement
      className={componentVariants({ variant, size, className })}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }} // Subtle animations
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionElement>
  );
};
```

#### Barrel Exports

Always update the appropriate `index.ts` file:

```typescript
// src/components/atoms/index.ts
export { Component, type ComponentProps } from "./Component.client";
```

### 🎭 Animation Guidelines

#### Motion.create Pattern

All atoms must use `motion.create()`:

```typescript
const MotionButton = motion.create("button");
const MotionInput = motion.create("input");
const MotionDiv = motion.create("div");
```

#### Animation Presets

Use predefined animation presets from `@/utils/motion`:

```typescript
import { animationPresets } from "@/utils/motion";

// Use preset animations
<MotionDiv {...animationPresets.slideInUp}>
  Content
</MotionDiv>
```

#### Animation Principles

- **Subtle and purposeful** - Enhance UX, don't distract
- **Respect accessibility** - Motion automatically handles `prefers-reduced-motion`
- **Consistent timing** - Use spring animations with consistent parameters
- **Performance-focused** - Use `motion.create()` for optimization

### ⚡ CVA Variant Guidelines

#### Naming Conventions

```typescript
const componentVariants = cva("base", {
  variants: {
    // Use semantic names
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      destructive: "btn-error",
    },
    // Use t-shirt sizes
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    // Use boolean variants for states
    disabled: {
      true: "btn-disabled",
    },
  },
  // Always provide defaults
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

#### Type Safety

Extend `VariantProps` for type-safe props:

```typescript
export interface Props extends VariantProps<typeof variants> {
  // Additional props
}
```

### 🎨 Styling Guidelines

#### DaisyUI First

- **Use DaisyUI classes** for components (`btn`, `input`, `card`, etc.)
- **Prefer semantic colors** (`primary`, `secondary`) over hardcoded colors
- **Use DaisyUI modifiers** (`btn-outline`, `input-bordered`, etc.)

#### Tailwind Utilities

- **Responsive design** - Mobile-first approach
- **Spacing consistency** - Use Tailwind spacing scale
- **No inline styles** - Always use utility classes

#### Class Name Utility

Use the `cn` utility for conditional classes:

```typescript
import { cn } from "@/styles/cn";

const className = cn(
  "base-classes",
  condition && "conditional-classes",
  "additional-classes",
);
```

### ♿ Accessibility Requirements

#### Semantic HTML

- Use proper HTML elements (`button`, not `div` with click handlers)
- Include proper heading hierarchy (`h1`, `h2`, `h3`, etc.)
- Use lists for grouped content (`ul`, `ol`, `li`)

#### ARIA Attributes

- Include `aria-label` for interactive elements
- Use `aria-describedby` for additional context
- Implement `aria-expanded` for collapsible content
- Add `role` attributes when semantic HTML isn't sufficient

#### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Implement proper focus management
- Use `tabIndex` appropriately
- Test with keyboard-only navigation

#### Screen Reader Support

- Provide alternative text for images
- Use `sr-only` classes for screen reader-only content
- Ensure content is logically structured

### 📝 TypeScript Standards

#### Strict Mode

- **No `any` types** - Use proper typing or `unknown`
- **Prefer interfaces** over type aliases for objects
- **Use generics** for reusable type patterns

#### Type Definitions

```typescript
// Props interfaces
export interface ComponentProps {
  required: string;
  optional?: boolean;
  callback?: (value: string) => void;
}

// Event handlers
onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

// Children types
children: React.ReactNode; // For any React content
children: string; // For text-only content
```

### 📚 Documentation Requirements

#### TSDoc Comments

All exported components, functions, and types must include TSDoc:

````typescript
/**
 * Brief description of the component
 * @param props - Description of props
 * @returns Description of what's returned
 * @example
 * ```tsx
 * <Component variant="primary" size="lg">
 *   Content
 * </Component>
 * ```
 * @remarks
 * Additional notes about usage, accessibility, or special behaviors
 */
````

#### README Updates

- Update component documentation in README.md
- Add new utilities to the utilities section
- Document any new patterns or conventions

### 🧪 Testing Guidelines

#### Component Testing

- Test all variants and props combinations
- Verify accessibility with screen readers
- Test keyboard navigation
- Validate responsive behavior

#### Visual Testing

- Test components in light and dark themes
- Verify animations work smoothly
- Check component spacing and alignment
- Test on different screen sizes

### 🔄 Pull Request Process

#### Before Submitting

1. **Run linting**: `bun run lint`
2. **Check TypeScript**: `bun run type-check`
3. **Test thoroughly** across different scenarios
4. **Update documentation** if needed

#### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Component Category

- [ ] Atom
- [ ] Molecule
- [ ] Organism
- [ ] Template

## Checklist

- [ ] Follows atomic design principles
- [ ] Uses CVA for variants
- [ ] Implements motion.create pattern
- [ ] Includes proper TypeScript types
- [ ] Has TSDoc documentation
- [ ] Follows accessibility guidelines
- [ ] Uses DaisyUI classes appropriately
- [ ] Includes barrel exports
- [ ] Tests pass locally

## Screenshots/Videos

If applicable, add screenshots or videos demonstrating the changes.
```

### 🐛 Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Screenshots or videos** if applicable
- **Environment details** (browser, OS, etc.)

### 💡 Feature Requests

For new features, please provide:

- **Clear use case** and problem being solved
- **Proposed solution** with implementation details
- **Component category** (atom, molecule, organism, template)
- **Design considerations** and accessibility requirements

## 🎯 Code Review Criteria

Reviewers will check for:

- ✅ **Atomic design compliance** - Correct component categorization
- ✅ **CVA implementation** - Type-safe variants
- ✅ **Motion.create usage** - Proper animation patterns
- ✅ **TypeScript quality** - No `any` types, proper interfaces
- ✅ **Accessibility** - Semantic HTML, ARIA attributes
- ✅ **DaisyUI usage** - Consistent styling approach
- ✅ **Documentation** - TSDoc comments and examples
- ✅ **File organization** - Proper naming and barrel exports

## 🤝 Community Guidelines

- **Be respectful** and constructive in discussions
- **Ask questions** if anything is unclear
- **Share knowledge** and help other contributors
- **Follow the code of conduct** in all interactions

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Code Review** - For feedback on implementation approaches

Thank you for contributing to AI Chat Starter! 🎉
