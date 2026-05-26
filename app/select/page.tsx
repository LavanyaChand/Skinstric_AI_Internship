// import React from 'react'
// import BackButton from '../sharedComponent/BackButton'
// import Link from 'next/link'
// import Image from 'next/image'
// import arrowRight from '../../public/icons/arrowRight.svg';
// import largeDiamond from "../../public/images/largeDiamond.png";
// import mediumDiamond from "../../public/images/mediumDiamond.png";
// import smallDiamond from "../../public/images/smallDiamond.png";

// function page() {
//   return (
//     <div>
//       <div className="fixed top-16 left-9 ">
//         <h1 className="font-semibold text-[16px]">A.I. ANALYSIS</h1>
//         <p className='font-regular text-[14px]'>A.I. has estimated the following.</p>
//         <p className='font-regular text-[14px]'>Fix estimated information if needed.</p>
//       </div>

//       {/* Middle diamonds */}
//       <div className="h-[100vh] flex items-center justify-center col-start-2 fade-up fade-up-delay-1">
//         <div className="relative flex items-center justify-center">
//           {/* dotted diamonds (3 layers) */}
//           {/* Small diamond */}
//           <div className="absolute flex items-center justify-center diamond-animate diamond-speed-1">
//             <div className="relative w-[602px] h-[602px]">
//               <Image src={smallDiamond} alt="Diamond Small" fill sizes="100vw" />
//             </div>
//           </div>

//           {/* Medium diamond */}
//           <div className="absolute flex items-center justify-center diamond-animate diamond-speed-2">
//             <div className="relative w-[682px] h-[682px]">
//               <Image src={mediumDiamond} alt="Diamond Medium" fill sizes="100vw" />
//             </div>
//           </div>

//           {/* Large diamond */}
//           <div className="absolute flex items-center justify-center diamond-animate diamond-speed-3">
//             <div className="relative w-[762px] h-[762px]">
//               <Image src={largeDiamond} alt="Diamond Large" fill sizes="100vw" />
//             </div>
//           </div>

//           {/* 3x3 grid with four rotated tiles */}
//           <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0 ">
//             {/* top-center */}
//             <div className="flex items-center justify-center col-start-2 fade-up fade-up-delay-1 opacity-0">
//               <Link href="/summary">
//                 <button className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300">
//                   <span className="transform -rotate-45">Demographics</span>
//                 </button>
//               </Link>
//             </div>

//             {/* middle-left */}
//             <div className="flex items-center justify-center row-start-2 col-start-1 fade-up fade-up-delay-2 opacity-0">
//               <button
//                 className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] cursor-not-allowed"
//                 disabled
//               >
//                 <span className="transform -rotate-45">Cosmetic Concerns</span>
//               </button>
//             </div>

//             {/* middle-right */}
//             <div className="flex items-center justify-center row-start-2 col-start-3 fade-up fade-up-delay-3 opacity-0">
//               <button
//                 className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-4.5 md:-m-5 font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] cursor-not-allowed"
//                 disabled
//               >
//                 <span className="transform -rotate-45">Skin Type Details</span>
//               </button>
//             </div>

//             {/* bottom-center */}
//             <div className="flex items-center justify-center row-start-3 col-start-2 fade-up fade-up-delay-4 opacity-0">
//               <button
//                 className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] cursor-not-allowed"
//                 disabled
//               >
//                 <span className="transform -rotate-45">Weather</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>



//       {/* Bottom bar */}
//       <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
//         <div className="relative h-24">
//           {/* left/corner */}
//           <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
//             <BackButton />
//           </div>

//           <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
//             {/* right/corner */}
//             <div className="flex items-center text-dark-2 group">
//               {/* desktop label outside */}


//               <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
//                 Get Summary
//               </span>

//               <Link href="/summary" aria-label="Proceed">
//                 <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
//                   {/* mobile label inside diamond */}
//                   <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
//                     Proceed
//                   </span>
//                   {/* desktop arrow inside diamond */}
//                   <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
//                     <Image src={arrowRight} alt="" />
//                   </span>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default page


"use client";

import React, { useState } from "react";
import BackButton from "../sharedComponent/BackButton";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "../../public/icons/arrowRight.svg";
import largeDiamond from "../../public/images/largeDiamond.png";
import mediumDiamond from "../../public/images/mediumDiamond.png";
import smallDiamond from "../../public/images/smallDiamond.png";

function Page() {
  // When true, enlarge the dotted diamonds behind the grid
  const [enlargeDots, setEnlargeDots] = useState(false);
  // Tracks which disabled tile is hovered/focused for the WIP toast
  const [wipTile, setWipTile] = useState<string | null>(null);

  return (
    <div>
      {/* Top-left label (unchanged) */}
      <div className="fixed top-16 left-9 ">
         <h1 className="font-semibold text-[16px]">A.I. ANALYSIS</h1>
         <p className='font-regular text-[14px]'>A.I. has estimated the following.</p>
         <p className='font-regular text-[14px]'>Fix estimated information if needed.</p>
       </div>

      {/* Middle diamonds */}
      <div className="h-[100vh] flex items-center justify-center col-start-2 fade-up fade-up-delay-1">
        <div className="relative flex items-center justify-center">
          {/* Dotted diamonds backdrop */}
          {/* Small */}
          <div className="absolute flex items-center justify-center diamond-animate diamond-speed-1">
            <div
              className={`relative transition-all duration-300 ease-out 
                          ${enlargeDots ? "w-[602px] h-[602px]" : "w-[480px] h-[480px]"}`}
            >
              <Image src={smallDiamond} alt="Diamond Small" fill sizes="100vw" />
            </div>
          </div>

          {/* Medium */}
          <div className="absolute flex items-center justify-center diamond-animate diamond-speed-2">
            <div
              className={`relative transition-all duration-300 ease-out 
                          ${enlargeDots ? "w-[682px] h-[682px]" : "w-[560px] h-[560px]"}`}
            >
              <Image src={mediumDiamond} alt="Diamond Medium" fill sizes="100vw" />
            </div>
          </div>

          {/* Large */}
          <div className="absolute flex items-center justify-center diamond-animate diamond-speed-3">
            <div
              className={`relative transition-all duration-300 ease-out 
                          ${enlargeDots ? "w-[762px] h-[762px]" : "w-[650px] h-[650px]"}`}
            >
              <Image src={largeDiamond} alt="Diamond Large" fill sizes="100vw" />
            </div>
          </div>

          {/* 3x3 grid with four rotated tiles */}
          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0 ">
            {/* top-center - Demographics */}
            <div className="flex items-center justify-center col-start-2 fade-up fade-up-delay-1 opacity-0">
              <Link href="/summary">
                <button
                  className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300"
                  onMouseEnter={() => setEnlargeDots(true)}
                  onMouseLeave={() => setEnlargeDots(false)}
                >
                  <span className="transform -rotate-45">Demographics</span>
                </button>
              </Link>
            </div>

            {/* middle-left - Cosmetic Concerns (WIP) */}
            <div className="flex items-center justify-center row-start-2 col-start-1 fade-up fade-up-delay-2 opacity-0">
              <button
                className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed opacity-50"
                aria-label="Cosmetic Concerns -Coming Soon"
                aria-disabled="true"
                title="Work in progress -Coming Soon"
                onMouseEnter={() => { setEnlargeDots(true); setWipTile("Cosmetic Concerns"); }}
                onMouseLeave={() => { setEnlargeDots(false); setWipTile(null); }}
                onFocus={() => setWipTile("Cosmetic Concerns")}
                onBlur={() => setWipTile(null)}
              >
                <span className="transform -rotate-45">Cosmetic Concerns</span>
              </button>
            </div>

            {/* middle-right - Skin Type Details (WIP) */}
            <div className="flex items-center justify-center row-start-2 col-start-3 fade-up fade-up-delay-3 opacity-0">
              <button
                className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 transform rotate-45 flex items-center justify-center -m-4.5 md:-m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed opacity-50"
                aria-label="Skin Type Details -Coming Soon"
                aria-disabled="true"
                title="Work in progress -Coming Soon"
                onMouseEnter={() => { setEnlargeDots(true); setWipTile("Skin Type Details"); }}
                onMouseLeave={() => { setEnlargeDots(false); setWipTile(null); }}
                onFocus={() => setWipTile("Skin Type Details")}
                onBlur={() => setWipTile(null)}
              >
                <span className="transform -rotate-45">Skin Type Details</span>
              </button>
            </div>

            {/* bottom-center - Weather (WIP) */}
            <div className="flex items-center justify-center row-start-3 col-start-2 fade-up fade-up-delay-4 opacity-0">
              <button
                className="w-[130px] h-[130px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed opacity-50"
                aria-label="Weather -Coming Soon"
                aria-disabled="true"
                title="Work in progress -Coming Soon"
                onMouseEnter={() => { setEnlargeDots(true); setWipTile("Weather"); }}
                onMouseLeave={() => { setEnlargeDots(false); setWipTile(null); }}
                onFocus={() => setWipTile("Weather")}
                onBlur={() => setWipTile(null)}
              >
                <span className="transform -rotate-45">Weather</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Screen-reader live region - announces WIP status on hover/focus */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {wipTile ? `${wipTile} is a work in progress and coming soon.` : ""}
      </div>

      {/* Visual "Coming Soon" toast for sighted users */}
      <div
        role="status"
        aria-hidden="true"
        className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[200] px-5 py-2 bg-[#1a1a1a] text-white text-[11px] font-semibold uppercase tracking-widest pointer-events-none transition-all duration-200 ${
          wipTile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {wipTile} - Work in Progress
      </div>

      {/* Bottom bar (unchanged) */}
      <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
        <div className="relative h-24">
          {/* left/corner */}
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            <BackButton />
          </div>

          <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
            {/* right/corner */}
            <div className="flex items-center text-dark-2 group">
              <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
                Get Summary
              </span>

              <Link href="/summary" aria-label="Proceed">
                <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                  {/* mobile label inside diamond */}
                  <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
                    Proceed
                  </span>
                  {/* desktop arrow inside diamond */}
                  <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
                    <Image src={arrowRight} alt="" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
