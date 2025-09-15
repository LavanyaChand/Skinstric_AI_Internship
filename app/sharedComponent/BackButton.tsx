'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react'
import arrowLeft from '../../public/icons/arrowLeft.svg';
import Image from 'next/image';

function BackButton() {

    const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    router.back();      // Go back
  };


  return (
    <Link
      href="#"
      onClick={handleBack}
      aria-label="Back"
      className="flex items-center text-dark-2 group bg-transparent"
    >
      <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
        {/* mobile label inside diamond */}
        <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
          Back
        </span>
        {/* desktop arrow inside diamond */}
        <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
          <Image src={arrowLeft} alt="" />
        </span>
      </div>
      {/* desktop label outside */}
      <span className="hidden md:inline-block ml-6 text-sm font-semibold uppercase tracking-wide">
        Back
      </span>
    </Link>
  );
}

export default BackButton
