'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowRight from '../public/icons/arrowRight.svg';
import arrowLeft from '../public/icons/arrowLeft.svg';

export default function Home() {
  const [hover, setHover] = useState<null | 'left' | 'right'>(null);

  const titleShift =
    hover === 'left'  ? 'hero-x-right' : // left rail -> push title to the RIGHT
    hover === 'right' ? 'hero-x-left'  : // right rail -> push title to the LEFT
                        'hero-x-0';

  const line2Shift =
    hover === 'left'  ? 'hero-line-right' :
    hover === 'right' ? 'hero-line-left'  :
                        'hero-line-0';

  return (
    <div className="max-sm:scale-[0.75] max-sm:origin-center p-20">
      <div className="flex-center flex-col h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        {/* center stack */}
        <div className="relative z-10 text-center">
          <h1 className={`hero-title fadeIn delay-2 ease-in-out hero-anim ${titleShift}`}>
            Sophisticated
            <span className={`hero-span hero-anim ${line2Shift}`}>skincare</span>
          </h1>

          {/* mobile design*/}

          <div className="absolute inset-0 flex items-center justify-center lg:hidden fadeIn delay-3">
            <div className="diamond-350 border-dotted absolute top-[50%] left-1/2 -translate-x-[50%] -translate-y-[50%]"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center lg:hidden fadeIn delay-3_5">
            <div className="diamond-420 border-dotted absolute top-[50%] left-1/2 -translate-x-[50%] -translate-y-[50%]"></div>
          </div>


          <p className="hero-sub-sm mx-auto fadeInUp delay-2_5">
            Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
          </p>

          <div className="hero-cta-sm">
            <Link href="/testing">
              <button className="btn-ghost cursor-pointer fadeInUp delay-2_5">
                <span className="btn-ghost__label">ENTER EXPERIENCE</span>
                <div className="diamond-24 flex items-center justify-center">
                  <span className="absolute scale-[0.5] transition-transform duration-300">
                    <Image src={arrowRight} width={12} height={12} alt="" className="rotate-[-45deg]" />
                  </span>
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* LEFT rail */}
        <div
          className={`hidden lg:block fixed w-[500px] h-[500px] left-[calc(-50vw)] top-1/2 -translate-y-1/2
                       hero-anim ${hover === 'right' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="relative w-full h-full fadeInRight delay-2_5">
            <div className="w-full h-full rotate-45 fixed border border-dotted border-dark-3 inset-0" />
            <button className="cursor-pointer group inline-flex items-center justify-center gap-4 text-sm text-dark-2 h-9
                               absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6
                               [@media(width>=1920px)]:translate-x-1/20 px-3 py-1"
                               onMouseEnter={() => setHover('left')}
                                onMouseLeave={() => setHover(null)}
                               >
              <div className="diamond-30 group-hover:scale-110 duration-300" />
              <span className="absolute left-[20px] top-[14px] hover:scale-[0.9] duration-300">
                <Image src={arrowLeft} width={11} height={18} alt="" />
              </span>
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        </div>

        {/* RIGHT rail (fades out while left is hovered) */}
        <div
          className={`hidden lg:block fixed w-[500px] h-[500px] left-[calc(53vw)] top-1/2 -translate-y-1/2 
                      hero-anim ${hover === 'left' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                      `}
        >
          <div className="relative w-full h-full fadeInLeft delay-2_5">
            <div className="w-full h-full rotate-45 fixed border border-dotted border-dark-3 inset-0" />
            <Link href="/testing">
              <button className="cursor-pointer group inline-flex items-center justify-center gap-4 text-sm text-dark-2 h-9
                                 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6
                                 [@media(width>=1920px)]:-translate-x-1/20 px-3 py-1"
                                 onMouseEnter={() => setHover('right')}
                                 onMouseLeave={() => setHover(null)}
                                 >
                <span>TAKE TEST</span>
                <div className="diamond-30 group-hover:scale-110 duration-300" />
                <span className="absolute right-[20px] top-[14px] scale-[0.9] duration-300">
                  <Image src={arrowRight} width={11} height={18} alt="" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* desktop caption */}
      <div className="hero-caption-left fadeIn delay-3">
        <p>SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</p>
      </div>
    </div>
  );
}
