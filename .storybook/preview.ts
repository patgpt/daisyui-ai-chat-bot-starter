 
import '../src/styles/globals.css';  

const preview = {
  parameters: {
    // Next.js configuration
    nextjs: {
      appDirectory: true, // Enable Next.js app directory support
    },
    // Control panel configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Actions configuration
    actions: { argTypesRegex: '^on[A-Z].*' },
    // Viewport configuration
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    // Background configuration for DaisyUI themes
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1d232a',
        },
      ],
    },
    // Docs configuration
    docs: {
      story: {
        height: '400px',
      },
    },
  },
  // Global types for theme switching
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'DaisyUI theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'cupcake', title: 'Cupcake' },
          { value: 'bumblebee', title: 'Bumblebee' },
          { value: 'emerald', title: 'Emerald' },
          { value: 'corporate', title: 'Corporate' },
          { value: 'synthwave', title: 'Synthwave' },
          { value: 'retro', title: 'Retro' },
          { value: 'cyberpunk', title: 'Cyberpunk' },
          { value: 'valentine', title: 'Valentine' },
          { value: 'halloween', title: 'Halloween' },
          { value: 'garden', title: 'Garden' },
          { value: 'forest', title: 'Forest' },
          { value: 'aqua', title: 'Aqua' },
          { value: 'lofi', title: 'Lofi' },
          { value: 'pastel', title: 'Pastel' },
          { value: 'fantasy', title: 'Fantasy' },
          { value: 'wireframe', title: 'Wireframe' },
          { value: 'black', title: 'Black' },
          { value: 'luxury', title: 'Luxury' },
          { value: 'dracula', title: 'Dracula' },
          { value: 'cmyk', title: 'CMYK' },
          { value: 'autumn', title: 'Autumn' },
          { value: 'business', title: 'Business' },
          { value: 'acid', title: 'Acid' },
          { value: 'lemonade', title: 'Lemonade' },
          { value: 'night', title: 'Night' },
          { value: 'coffee', title: 'Coffee' },
          { value: 'winter', title: 'Winter' },
          { value: 'dim', title: 'Dim' },
          { value: 'nord', title: 'Nord' },
          { value: 'sunset', title: 'Sunset' },
        ],
      },
    },
  },
  // Decorators for theme switching
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      
      return (
        <div data-theme={theme} className="min-h-screen bg-base-100 text-base-content">
          <div className="p-4">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;