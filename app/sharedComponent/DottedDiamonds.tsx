"use client";
import Image from "next/image";
import largeDiamond from "../../public/images/largeDiamond.png";
import mediumDiamond from "../../public/images/mediumDiamond.png";
import smallDiamond from "../../public/images/smallDiamond.png";

export default function DottedDiamonds() {
  return (
    <>
      <Image
        alt="Diamond Large"
        src={largeDiamond}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-[190deg] select-none pointer-events-none"
      />
      <Image
        alt="Diamond Medium"
        src={mediumDiamond}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-[185deg] select-none pointer-events-none"
      />
      <Image
        alt="Diamond Small"
        src={smallDiamond}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest select-none pointer-events-none"
      />
    </>
  );
}
