import { useEffect, useState } from "react";
import { getSquidGameImages } from "../utils/tmdb";
import { Image } from "../utils/types";

const Images = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { backdrops } = await getSquidGameImages();
      setImages(backdrops.map((img: Image) => img.url));
    })();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-between w-screen gap-2 p-4 overflow-hidden">
      {images.map((img: string, index: number) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <h3>{index}</h3>
          <img src={img} alt={img} className="w-40 h-auto" />
        </div>
      ))}
    </div>
  );
};

export default Images;
