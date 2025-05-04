import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { IconTriangle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  isAvailable: boolean;
  image: string;
  discription: string;
  cardIndex: number;
};

const GameCard: React.FC<Props> = ({ title, isAvailable, image, discription, cardIndex }) => {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 120,
          delay: cardIndex === 1 ? cardIndex * 5 : cardIndex === 2 ? 6 : 7,
        },
      });
    }
    sequence();
  }, [controls, cardIndex]);
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={controls}
      whileHover={{ scale: 1.05, boxShadow: "0 2px 16px #ff007f" }}
      whileTap={{ scale: 1.05, boxShadow: "0 2px 16px #ff007f" }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative flex flex-col items-center gap-4 overflow-hidden cursor-pointer h-96 w-80 rounded-xl bg-neutral "
    >
      {!isAvailable && (
        <span className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-PurpleMist">
          <h1 className="text-3xl text-TextPrimary">Coming Soon...</h1>
        </span>
      )}
      <div className="relative flex-1">
        <img
          src={image}
          alt="Squid Game Card Image"
          loading="lazy"
          className="object-cover w-full h-full"
        />
        <span className="absolute top-0 left-0 w-full h-full bg-DarkOverlay/70"></span>
      </div>
      <div className="flex flex-col items-center flex-1 gap-3 pt-2">
        <h1 className="text-2xl font-bold text-primaryAccent">{title}</h1>
        <p className="font-medium text-TextPrimary">{discription}</p>
        <button
          className="flex items-center justify-center gap-2 px-3 py-2 font-bold tracking-wider uppercase transition-all duration-300 ease-in bg-transparent border-2 cursor-pointer group text-primaryAccent hover:text-TextPrimary rounded-xl hover:bg-primaryAccent hover:border-transparent border-primaryAccent"
          onClick={() => navigate("/redlightgreenlight")}
        >
          <IconTriangle
            stroke={2}
            size={25}
            className="transition-all duration-300 ease-in group-hover:text-TextPrimary text-primaryAccent group-hover:rotate-90"
          />
          Play
        </button>
      </div>
    </motion.div>
  );
};

export default React.memo(GameCard);
