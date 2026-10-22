"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "../data/site";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="TS-SPACES home">
      <img src="/logo-mark.svg" width="39" height="39" alt="" />
      <span>
        TS-SPACES<small>ROOM FOR YOUR NEXT CHAPTER</small>
      </span>
    </Link>
  );
}
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {nav.map(([label, url]) => (
            <Link
              key={url}
              href={url}
              aria-current={path === url ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact?intent=visit" className="button nav-cta">
          Book a Visit <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggle}
          aria-controls="main-navigation"
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
