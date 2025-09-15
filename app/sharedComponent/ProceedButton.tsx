import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import arrowRight from '../../public/icons/arrowRight.svg';

function ProceedButton() {
  return (
    <div className="flex items-center text-dark-2 group">
      {/* desktop label outside */}
      <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
        Proceed
      </span>

      <Link href="/result" aria-label="Proceed">
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
  );
}

export default ProceedButton
