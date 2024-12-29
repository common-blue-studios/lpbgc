"use client";

import React, { useState } from "react";
import { NavMobile } from "@/components/nav-mobile";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Nav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1/12 flex-col h-full justify-center items-center w-[120px]">
        <ul className="flex flex-col gap-6 p-6 font-geist-sans text-lg text-gray-800 w-full">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>

      <Button
        variant="outline"
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Image src="/close.svg" alt="Close Menu" width={24} height={24} /> : <Image src="/bars.svg" alt="Open Menu" width={24} height={24} />}
      </Button>

      {showMobileMenu && <NavMobile show={showMobileMenu} setShow={setShowMobileMenu} />}
    </div>
  );
}
