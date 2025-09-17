"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const isCamera = pathname?.startsWith("/camera");
  const isHome = pathname?.endsWith("/");

  

  return (
    <div className="absolute top-0 left-0 flex flex-row h-[64px] w-full justify-between py-3 mb-3 z-[1000] bg-transparent">
      <div className="flex-center flex-row pt-1 scale-75">
         <Link
          href="/"
          // camera page: white by default; other pages: dark
          className={`font-bold h-9 px-4 py-2 ${isCamera ? "text-white" : "text-dark-1"}`}
          // if --nav-logo-color exists, it overrides; if not, this inline
          // color is ignored and the class color is used.
          style={{ color: "var(--nav-logo-color)" }}
        >
          SKINSTRIC
        </Link>
      </div>

      {
        isHome && (
        <button
          className="inline-flex-center gap-2 whitespace-nowrap font-semibold transition-colors cursor-not-allowed shadow h-9 px-4 py-2 mx-4 scale-[0.8] text-light-2 text-[10px] bg-dark-2 leading-[16px]"
        >
          ENTER CODE
        </button> 

        )
      }
     
    </div>
  );
};

export default NavBar;
