import React, { lazy, useEffect, useState } from "react";
import { getSquidGameImages } from "../utils/tmdb";
import { Image } from "../utils/types";
import { motion } from "framer-motion";
import { IconTriangleFilled, IconRectangle, IconCircle } from "@tabler/icons-react";

const shapes = [IconRectangle, IconTriangleFilled, IconCircle];

const GameCard = lazy(() => import("../components/GameCard"));
const Portal = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { backdrops } = await getSquidGameImages();
      setImages(backdrops.map((img: Image) => img.url));
    })();
  }, []);
  return (
    <div className="relative flex flex-col items-center w-full h-screen gap-6 pt-20 ">
      <img
        src={images[84]}
        alt="Squid Game Guards Image"
        className="absolute top-0 left-0 object-cover w-full h-full"
      />
      <span className="absolute top-0 left-0 z-10 w-full h-full bg-DarkOverlay"></span>
      <div className="absolute z-20 flex items-center gap-1 left-5 top-5 text-primaryAccent">
        {shapes.map((Icon, index) => (
          <motion.div
            key={index}
            initial={
              index === 0
                ? { opacity: 0, x: -50 }
                : index === 1
                ? { opacity: 0, y: -50 }
                : { opacity: 0, x: 50 }
            }
            animate={
              index === 0
                ? { opacity: 1, x: 0 }
                : index === 1
                ? { opacity: 1, y: 0 }
                : { opacity: 1, x: 0 }
            }
            transition={{
              delay: index === 0 ? 2.5 : index === 1 ? 3.5 : 4.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Icon stroke={2} size={40} />
          </motion.div>
        ))}
      </div>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.8,
            },
          },
        }}
        className="z-20 text-5xl font-bold tracking-wider text-TextPrimary"
      >
        {["Squid", "Game", "Portal"].map((word: string, index: number) => (
          <motion.span
            key={index}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className={`inline-block mr-2 z-20 ${
              word === "Game" ? "px-1 pb-1 bg-primaryAccent rounded-xl" : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
      <div className="z-20 flex items-center gap-10 mt-10">
        <GameCard
          cardIndex={1}
          title="Red Light, Green Light"
          isAvailable={true}
          image={images[35]}
          discription="Move only when the doll isn't watching..."
        />
        <GameCard
          cardIndex={2}
          title="Dalgona Candy"
          isAvailable={false}
          image={images[1]}
          discription=""
        />
        <GameCard
          cardIndex={3}
          title="Tug Of War"
          isAvailable={false}
          image={images[2]}
          discription=""
        />
      </div>
    </div>
  );
};

export default React.memo(Portal);
