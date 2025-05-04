import React, { useEffect, useState } from "react";
import { getSquidGameImages } from "../utils/tmdb";
import { Image } from "../utils/types";
import { motion } from "framer-motion";

const RedLightGreenLight = () => {
  const [images, setImages] = useState<string[]>([]);
  // const [isRed, setIsRed] = useState<boolean>(false);
  const isRed: boolean = false;

  useEffect(() => {
    (async () => {
      const { backdrops } = await getSquidGameImages();
      setImages(backdrops.map((img: Image) => img.url));
    })();
  }, []);
  return (
    <div className="w-screen h-screen bg-Background relative overflow-hidden perspective-midrange">
      <img
        src={images[37]}
        alt="Squid Game Doll Images"
        className="absolute w-full h-full object-cover blur-xs"
      />
      <motion.img
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isRed ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        src="/src/assets/Doll.png"
        alt="Squid Game Doll"
        className="absolute left-1/2 top-10 -translate-x-1/2 w-32"
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
};

export default React.memo(RedLightGreenLight);
