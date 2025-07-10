"use client";

import React from "react";

/**
 * Props for the Footer component.
 */
export interface FooterProps {
  /**
   * The copyright owner or project name.
   */
  copyright: string;
  /**
   * The author's display name.
   */
  author: string;
  /**
   * The author's link (e.g., GitHub profile).
   */
  authorLink: string;
  /**
   * The year to display.
   */
  year: number;
  /**
   * The country code or emoji.
   */
  country: string;
}

/**
 * A semantic, accessible, DaisyUI-styled footer for the site.
 * @remarks
 * - Uses DaisyUI `footer` and Tailwind utility classes.
 * - Fully accessible and keyboard navigable.
 * - Follows atomic design and strict TypeScript rules.
 */
export const Footer: React.FC<FooterProps> = ({
  copyright,
  author,
  authorLink,
  year,
  country,
}) => (
  <footer className="footer bg-base-200 text-base-content items-center p-4">
    <div className="w-full text-center">
      <p className="text-sm">
        {copyright} - created by
        <a
          href={authorLink}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover ml-1 font-semibold"
        >
          {author}
        </a>{" "}
        with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        in {country} - {year}
      </p>
    </div>
  </footer>
);
