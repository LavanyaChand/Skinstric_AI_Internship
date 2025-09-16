'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import arrowLeft from '../../public/icons/arrowLeft.svg';

type BackButtonProps = {
  /** Called right before navigating back (useful for cleanup) */
  onBeforeBack?: () => void;
};

function BackButton({ onBeforeBack }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isCamera = pathname?.startsWith('/camera');

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    try { onBeforeBack?.(); } catch {}
    router.back();
  };

  return (
    <Link
      href="#"
      onClick={handleBack}
      aria-label="Back"
      className={`flex items-center group bg-transparent ${
        isCamera ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]' : 'text-dark-1'
      }`}
    >
      <div
        className={`diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110 border ${
          isCamera ? 'border-white' : 'border-[#1A1B1C]'
        }`}
      >
        <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
          Back
        </span>
        <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
          <Image src={arrowLeft} alt="" className={isCamera ? 'invert brightness-0' : ''} />
        </span>
      </div>
      <span className="hidden md:inline-block ml-6 text-sm font-semibold uppercase tracking-wide">
        Back
      </span>
    </Link>
  );
}

export default BackButton;
