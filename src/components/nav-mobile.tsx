"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./button";

interface navMobileProps {
  setShow: (show: boolean) => void;
  show: boolean;
}
export function NavMobile({ setShow, show }: navMobileProps) {
  return (
    <div className="fixed inset-0 z-50 grid h-screen bg-gray-50 p-6 shadow-md md:hidden">
      <nav className="grid gap-6 text-lg font-geist-sans text-gray-800">
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
          <li>
            <Button onClick={() => setShow(!show)} variant="secondary">
              {show ? "Close Menu" : "Open Menu"}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}