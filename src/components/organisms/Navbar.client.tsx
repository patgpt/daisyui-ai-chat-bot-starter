"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

/**
 * NavbarProps interface for future extensibility.
 */
export interface NavbarProps {
  /**
   * The title of the navbar.
   */
  title: string;
  /**
   * The home link of the navbar.
   */
  homeLink: string;
  /**
   * The links of the navbar.
   */
  links: { href: string; label: string }[];
  /**
   * The logo of the navbar.
   */
  logoPath: string;
}

/**
 * DaisyUI Navbar with mobile drawer and animated nav links.
 * @remarks
 * - Uses DaisyUI `navbar` and `drawer` classes for structure and mobile support.
 * - Uses `motion/react` for staggered, bounce-in animation of nav links.
 * - Fully accessible and keyboard navigable.
 * - Follows atomic design and strict TypeScript rules.
 */
export const Navbar: React.FC<NavbarProps> = ({
  title,
  homeLink,
  links,
  logoPath,
}) => {
  const [open, setOpen] = useState(false);

  // Animation variants for staggered bounce-in
  const listVariants = {
    open: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    closed: {},
  };
  const itemVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.6 },
    },
    closed: {
      x: -40,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="drawer z-50">
      <input
        id="navbar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen((v) => !v)}
        aria-label="Open navigation menu"
      />
      <div className="drawer-content">
        <nav className="navbar bg-base-100 shadow-md">
          <div className="flex-1">
            <Link
              href={homeLink}
              className="btn btn-ghost text-xl"
              aria-label="Home"
            >
              <Image
                src={logoPath}
                alt={title}
                width={100}
                height={100}
                className="h-10 w-10"
              />
            </Link>
          </div>
          <div className="hidden flex-none md:flex">
            <ul className="menu menu-horizontal px-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-none md:hidden">
            <label
              htmlFor="navbar-drawer"
              className="btn btn-square btn-ghost"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
        </nav>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="navbar-drawer"
          className="drawer-overlay"
          aria-label="Close navigation menu"
          tabIndex={0}
          onClick={() => setOpen(false)}
        />
        <aside className="menu bg-base-200 flex min-h-full w-64 flex-col gap-2 p-4">
          <div className="mb-4 flex items-center">
            <span className="text-lg font-bold">Menu</span>
            <button
              className="btn btn-sm btn-circle btn-ghost ml-auto"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <motion.ul
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={listVariants}
            className="flex flex-col gap-2"
          >
            {links.map((link) => (
              <motion.li key={link.href} variants={itemVariants} className="">
                <Link
                  href={link.href}
                  className="btn btn-ghost w-full justify-start text-left"
                  tabIndex={open ? 0 : -1}
                  aria-label={link.label}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </aside>
      </div>
    </div>
  );
};
