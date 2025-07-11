import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials", // Includes controls, actions, viewport, backgrounds, docs
    "@storybook/addon-a11y", // Accessibility testing
    "@storybook/addon-interactions", // Interaction testing
    "@storybook/addon-vitest", // Vitest integration
    "@chromatic-com/storybook", // Visual regression testing
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      // Enable Next.js features
      nextConfigPath: "../next.config.ts",
    },
  },
  staticDirs: ["../public"],
  // TypeScript configuration
  typescript: {
    check: false, // Disable type checking in Storybook for faster builds
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // Enable docs auto-generation
  docs: {
    autodocs: "tag",
  },
  // Core features
  features: {
    legacyDecoratorFileOrder: false,
  },
};

export default config;
