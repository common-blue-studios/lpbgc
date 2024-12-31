"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { NAVIGATION } from "@/config/presentation";

interface navMobileProps {
  setShow: (show: boolean) => void;
  show: boolean;
}
export function NavMobile({ setShow, show }: navMobileProps) {
  return (
    <div className="fixed inset-0 z-50 grid h-screen bg-gray-50 p-6 shadow-md md:hidden">
      <nav className="grid gap-6 text-lg font-geist-sans text-gray-800">
        <ul className="flex flex-col gap-6 p-6 font-geist-sans text-lg text-gray-800 w-full">
          {
            NAVIGATION.pages.map((page, index) => (
              <li key={index}>
                <Link
                  href={page.url}
                  onClick={() => setShow(!show)}
                  className="text-gray-700 hover:underline hover:underline-offset-4 hover:font-bold"
                >
                  {page.name}
                </Link>
              </li>
            ))
          }
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
