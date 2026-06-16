"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "House", href: "#house" },
  { label: "Brands", href: "#brands" },
  { label: "Standards", href: "#standards" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="headerShell">
        <a className="logoLockup" href="#top" aria-label="Ember Northwest home">
          <span className="logoMark">
            <Image src="/assets/logo/ember-logo.png" alt="" width={34} height={34} priority />
          </span>
          <span>
            <strong>Ember</strong>
            <small>Northwest</small>
          </span>
        </a>

        <nav className="mainNav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="headerActions">
          <a className="headerButton fillSweep" href="#brands">View brands</a>
          <button
            className="menuButton"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobilePanel ${open ? "isOpen" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
      </div>
    </header>
  );
}
