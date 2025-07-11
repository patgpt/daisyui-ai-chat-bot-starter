---
applyTo: "**"
---

Write semantic a11y HTML, JSX (typescript), and valid Tailwind and always use DaisyUI for components.

# Additional Rules:

# ✅ TypeScript & Code Quality

- Use `strict` TypeScript types and avoid `any` unless absolutely necessary.
- Always type props with `Props` interfaces or `ComponentPropsWithoutRef<>`.
- Prefer named exports and avoid default exports unless the component is the only export.
- Always use barrel exports (`index.ts`) in component folders.

# ✅ Tailwind & Styling

- Never use inline styles; use Tailwind utility classes or DaisyUI variants.
- Avoid `!important`; rely on design tokens and Tailwind config extensions.
- Extend Tailwind with custom colors using OKLCH where possible.
- Use atomic classes and avoid class bloat.

# ✅ DaisyUI

- Prefer DaisyUI components for UI primitives (e.g., `btn`, `card`, `modal`, `input`).
- Customize themes via DaisyUI `theme` extension; no hardcoded colors.

# ✅ Accessibility (a11y)

- Always use semantic HTML: e.g., `<button>` not `<div onClick>`.
- Include `aria-*` attributes and roles when needed.
- Always include `alt` for images and `aria-label` or `sr-only` for icons/buttons.
- Ensure all interactive elements are keyboard accessible.
- Use React-Aria patterns when needed for complex components.

# ✅ Components & Structure

- Create a Motion component for any element that needs to be animated. ie `const MotionInput = motion.create('input')`
- Prefer RSC (React Server Components) for static content.
- If a component has any client-side interactivity, use `use client` directive.
- If you want animations in a component, use `import * as motion from "motion/react-client"` directive.
- Follow atomic design: atoms, molecules, organisms, templates, pages.
- Folder naming: `/components/atoms`, `/components/organisms`, etc.
- File naming: `ComponentName.client.tsx`, `ComponentName.types.ts`, ComponentName.server.tsx, etc.
- Create skeleton/loading versions for async components.
- Components that require interactiveity should use the `react-aria-components` library. Use for inputs, buttons, and other interactive elements.  such as `Button`, `Input`, `Checkbox`, etc. We will want to use `Virtualizer` for any large lists or tables such as the chat history or message list. We will want to take advantage of thier drag and drop functionality for any drag and drop interactions such as file uploads or reordering items in a list.

# ✅ Linting & Formatting

- Enforce with ESLint FlatConfig and Prettier.
- Use custom ESLint rules to check accessibility and component structure.
- No unused imports, console logs, or `debugger`.

# ✅ Docs & Comments

- Use TSDoc for all exported functions/types/components.
- Document any complex logic inline.

# ✅ Testing

- All components must have unit or visual tests using RTL / Storybook.
- Use Playwright or Cypress for E2E if needed.

# ✅ Animation

- Atoms should use `const link = motion.create('input')` so that we can access motion props and animate elements throughout the site in a pleasant way.

- When animating in `RSC` import motion like this `import * as motion from "motion/react-client"`

- When importing motion in a Client component import like this `import motion from "motion/react"`

# Typescript

- Prefer interface
- Never use `any`

# Documentation

- Always keep the TSDoc comments up to date
- Always keep the README.md up to date

# ✅ TypeScript & Code Quality

- Use `strict` TypeScript types and avoid `any` unless absolutely necessary.
- Always type props with `Props` interfaces or `ComponentPropsWithoutRef<>`.
- Prefer named exports and avoid default exports unless the component is the only export.
- Always use barrel exports (`index.ts`) in component folders.
