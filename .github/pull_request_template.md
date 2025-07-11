## Description

Brief description of the changes in this PR.

## Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test updates

## Component Category

- [ ] Atom (Basic building block)
- [ ] Molecule (Simple combination)
- [ ] Organism (Complex component)
- [ ] Template (Page layout)
- [ ] Utility (Helper function/hook)
- [ ] Page (Application page)
- [ ] API (Backend endpoint)

## Implementation Checklist

### 🏗️ Atomic Design

- [ ] Component is placed in the correct atomic design category
- [ ] Component follows single responsibility principle
- [ ] Component composition is logical and reusable

### 🎨 Styling & Variants

- [ ] Uses CVA for type-safe variants
- [ ] Implements proper DaisyUI classes
- [ ] Includes appropriate variant options (size, color, state)
- [ ] Follows responsive design principles

### 🎭 Animation & Motion

- [ ] Uses `motion.create()` pattern for atoms
- [ ] Implements subtle and purposeful animations
- [ ] Respects `prefers-reduced-motion`
- [ ] Uses consistent animation timing and easing

### 📝 TypeScript

- [ ] Strict TypeScript compliance (no `any` types)
- [ ] Proper interface definitions
- [ ] Extends `VariantProps` for CVA components
- [ ] Includes proper event handler types

### ♿ Accessibility

- [ ] Uses semantic HTML elements
- [ ] Includes proper ARIA attributes
- [ ] Supports keyboard navigation
- [ ] Tested with screen readers
- [ ] Proper focus management
- [ ] High contrast compatibility

### 📚 Documentation

- [ ] Includes comprehensive TSDoc comments
- [ ] Provides usage examples
- [ ] Documents all props and variants
- [ ] Updates README if needed

### 🗂️ File Organization

- [ ] Follows naming convention (`.client.tsx` for client components)
- [ ] Includes barrel exports in `index.ts`
- [ ] Proper import/export structure
- [ ] Clean file organization

### 🧪 Testing & Quality

- [ ] Component renders without errors
- [ ] All variants work correctly
- [ ] Responsive behavior verified
- [ ] Keyboard navigation tested
- [ ] Theme compatibility (light/dark) verified
- [ ] Animation performance is smooth

## Usage Examples

```tsx
// Basic usage
<ComponentName variant="primary" size="md">
  Example content
</ComponentName>

// Advanced usage with motion props
<ComponentName
  variant="secondary"
  size="lg"
  whileHover={{ scale: 1.02 }}
  onAction={() => console.log('action')}
>
  Advanced example
</ComponentName>
```

## API Changes

If this PR introduces API changes, list them here:

- [ ] New props added
- [ ] Props removed/deprecated
- [ ] Variant options changed
- [ ] Breaking changes to existing API

## Screenshots/Videos

If applicable, add screenshots or videos demonstrating the changes:

<!-- Drag and drop images/videos here -->

## Testing

Describe how you tested these changes:

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile devices
- [ ] Tested with keyboard navigation
- [ ] Tested with screen reader
- [ ] Tested in light/dark themes

## Performance Impact

- [ ] No performance impact
- [ ] Performance improvement
- [ ] Potential performance impact (explained below)

## Breaking Changes

If this PR contains breaking changes, describe them here and provide migration instructions:

## Additional Notes

Any additional context, concerns, or notes for reviewers:

## Related Issues

Closes #(issue_number)
Related to #(issue_number)

---

## Reviewer Checklist

**For reviewers - please verify:**

- [ ] Code follows atomic design principles
- [ ] CVA implementation is correct
- [ ] Motion.create pattern is used appropriately
- [ ] TypeScript types are strict and correct
- [ ] Accessibility requirements are met
- [ ] Documentation is comprehensive
- [ ] File organization follows conventions
- [ ] Testing is adequate
