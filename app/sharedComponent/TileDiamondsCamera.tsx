import React from 'react'
import largeDiamond from "../../public/images/largeDiamond.png";
import mediumDiamond from "../../public/images/mediumDiamond.png";
import smallDiamond from "../../public/images/smallDiamond.png";
import Image from 'next/image';

function TileDiamondsCamera() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Image
        priority={false}
        src={largeDiamond}
        alt="Diamond Large"
        className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-[205deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Image
        priority={false}
        src={mediumDiamond}
        alt="Diamond Medium"
        className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-[190deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Image
        priority={false}
        src={smallDiamond}
        alt="Diamond Small"
        className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}


export default TileDiamondsCamera
