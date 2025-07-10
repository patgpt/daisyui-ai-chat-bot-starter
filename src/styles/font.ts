import { Inter, Merriweather, Monoton } from "next/font/google";

const mono = Monoton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const serif = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

/**
 * @description Fonts for the application
 * @returns The fonts
 */
export const fonts = {
  mono,
  sans,
  serif,
};
