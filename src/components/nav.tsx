"use client";

import React, { useState } from "react";
import { NavMobile } from "@/components/nav-mobile";
import { Button } from "./button";
import Image from "next/image";

export default function Nav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1/12 flex-col h-full justify-center items-center w-[120px]">
        <ul className="flex flex-col gap-6 p-6 font-geist-sans text-lg text-gray-800 w-full">
          <li>
            <a
              href="/"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/gallery"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation Toggle */}
      <Button
        variant="outline"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Image src="/close.svg" alt="Close Menu" width={24} height={24} /> : <Image src="/bars.svg" alt="Open Menu" width={24} height={24} />}
      </Button>

      {/* Mobile Navigation */}
      {showMobileMenu && <NavMobile show={showMobileMenu} setShow={setShowMobileMenu} />}
    </div>
  );
}
