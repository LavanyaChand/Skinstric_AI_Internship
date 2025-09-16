"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const isCamera = pathname?.startsWith("/camera");

  return (
    <div className="absolute top-0 left-0 flex flex-row h-[64px] w-full justify-between py-3 mb-3 z-[1000] bg-transparent">
      <div className="flex-center flex-row pt-1 scale-75">
        <Link
          href="/"
          className={`inline-flex-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-bold text-sm leading-[16px] ${
            isCamera
              ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
              : "text-dark-1"
          }`}
        >
          SKINSTRIC
        </Link>
      </div>

      {/* 
      <button
        className="inline-flex-center gap-2 whitespace-nowrap font-semibold transition-colors cursor-not-allowed shadow h-9 px-4 py-2 mx-4 scale-[0.8] text-light-2 text-[10px] bg-dark-2 leading-[16px]"
      >
        ENTER CODE
      </button> 
      */}
    </div>
  );
};

export default NavBar;
