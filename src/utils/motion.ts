import { motion } from "motion/react";

/**
 * Common motion.create components for reuse across the site.
 * Following the rule: "Atoms should use motion.create so we can access motion props and animate elements throughout the site."
 */

// Basic HTML elements
export const MotionDiv = motion.create("div");
export const MotionSection = motion.create("section");
export const MotionArticle = motion.create("article");
export const MotionHeader = motion.create("header");
export const MotionFooter = motion.create("footer");
export const MotionNav = motion.create("nav");
export const MotionMain = motion.create("main");

// Text elements
export const MotionH1 = motion.create("h1");
export const MotionH2 = motion.create("h2");
export const MotionH3 = motion.create("h3");
export const MotionH4 = motion.create("h4");
export const MotionH5 = motion.create("h5");
export const MotionH6 = motion.create("h6");
export const MotionP = motion.create("p");
export const MotionSpan = motion.create("span");

// List elements
export const MotionUl = motion.create("ul");
export const MotionOl = motion.create("ol");
export const MotionLi = motion.create("li");

// Form elements (already created in atoms, but exported here for consistency)
export const MotionButton = motion.create("button");
export const MotionInput = motion.create("input");
export const MotionTextarea = motion.create("textarea");
export const MotionSelect = motion.create("select");
export const MotionLabel = motion.create("label");

// Media elements
export const MotionImg = motion.create("img");
export const MotionVideo = motion.create("video");
export const MotionAudio = motion.create("audio");

/**
 * Common animation presets for consistent motion across the site.
 */
export const animationPresets = {
  // Hover animations
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  hoverSubtle: {
    scale: 1.01,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },

  // Tap animations
  tap: {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  tapSubtle: {
    scale: 0.99,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },

  // Focus animations
  focus: {
    scale: 1.01,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },

  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },

  // Slide animations
  slideInLeft: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  slideInRight: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  slideInUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  slideInDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },

  // Bounce animations
  bounce: {
    transition: { type: "spring", bounce: 0.5, duration: 0.6 },
  },

  // Stagger animations
  stagger: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

/**
 * Type helper for animation preset keys.
 */
export type AnimationPreset = keyof typeof animationPresets;
