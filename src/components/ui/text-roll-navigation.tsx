"use client";

import React from "react";
import { motion } from "framer-motion";
import "./text-roll-navigation.css";

const cn = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

export interface NavigationItem {
  name: string;
  href?: string;
  description?: string;
  id?: string;
}

export const defaultNavigationItems: NavigationItem[] = [
  { name: "Web Development", href: "#works", description: "React, Next.js, Headless CMS, APIs" },
  { name: "Mobile App Development", href: "#works", description: "Flutter, Android Native, Dart & Cross-Platform" },
  { name: "Software Engineering", href: "#works", description: "Scalable Architecture, Microservices, Python, Node.js" },
  { name: "UI/UX & Product Design", href: "#works", description: "Design Systems, Prototyping, Figma, User Experience" },
  { name: "Music & Audio Production", href: "#works", description: "Sound Design, Scoring, Audio Mastering" },
];

const STAGGER = 0.035;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = true }) => (
  <motion.span
    initial="initial"
    whileHover="hovered"
    className={cn("trn-roll-text relative block overflow-hidden", className)}
    style={{ lineHeight: 0.85 }}
    aria-label={children}
  >
    <div>
      {children.split("").map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (children.length - 1) / 2)
          : STAGGER * i;
        return (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45, delay }}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        );
      })}
    </div>

    <div className="absolute inset-0">
      {children.split("").map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (children.length - 1) / 2)
          : STAGGER * i;
        return (
          <motion.span
            key={`bot-${i}`}
            className="inline-block"
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45, delay }}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        );
      })}
    </div>
  </motion.span>
);

export const Skiper58: React.FC<{
  items?: NavigationItem[];
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}> = ({ items = defaultNavigationItems, className, onItemClick }) => (
  <ul className={cn("trn-list", className)}>
    {items.map((item, index) => (
      <li className="trn-item" key={index}>
        <a
          href={item.href || "#"}
          onClick={(e) => {
            if (onItemClick) {
              e.preventDefault();
              onItemClick(item);
            }
          }}
          className="trn-link group relative block cursor-pointer select-none text-center"
          aria-label={item.name}
        >
          <TextRoll
            center
            className="font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors"
          >
            {item.name}
          </TextRoll>
          {item.description && (
            <div className="trn-desc">
              <span>{item.description}</span>
            </div>
          )}
          <span className="trn-underline" />
        </a>
      </li>
    ))}
  </ul>
);

export default Skiper58;
