"use client";

import Image from "next/image";
import { useState } from "react";

const links = [{ label: "The house", href: "#house" }, { label: "Brands", href: "#brands" }, { label: "Our standard", href: "#standards" }];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="siteHeader">
    <a className="logoLockup" href="#top" aria-label="Ember Northwest home">
      <Image src="/logo/ember-logo.png" alt="" width={35} height={35} priority />
      <strong>EMBER<br />NORTHWEST</strong>
    </a>
    <nav aria-label="Primary navigation">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    <a className="headerContact" href="#contact">Get in touch <span>↗</span></a>
    <button className={`menuButton ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span /><span /></button>
    <div className={`mobileMenu ${open ? "open" : ""}`}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a href="#contact" onClick={() => setOpen(false)}>Get in touch ↗</a>
    </div>
  </header>;
}
