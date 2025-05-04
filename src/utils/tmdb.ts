import axios from "axios";
import { ImageProperties } from "./types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_AUTH_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getSquidGameImages = async () => {
  try {
    // Search for Squid Game
    const searchRes = await axios.get(`${BASE_URL}/search/tv`, {
      params: { query: "Squid Game" },
      headers: {
        Accept: "application/json",
        Authorization: TMDB_API_KEY,
      },
    });

    const show = searchRes.data.results[1];
    if (!show) throw new Error("Squid Game Not Found");

    const showId = show.id;

    // Get images
    const imagesRes = await axios.get(`${BASE_URL}/tv/${showId}/images`, {
      headers: {
        Accept: "application/json",
        Authorization: TMDB_API_KEY,
      },
    });

    const backdrops = imagesRes.data.backdrops.map((img: ImageProperties) => ({
      url: `${IMAGE_BASE_URL}/original${img.file_path}`,
      width: img.width,
      height: img.height,
    }));

    const posters = imagesRes.data.posters.map((img: ImageProperties) => ({
      url: `${IMAGE_BASE_URL}/w500${img.file_path}`,
      width: img.width,
      height: img.height,
    }));

    return { backdrops, posters };
  } catch (error) {
    console.error("TMDB fetch error,", error);
    return { backdrops: [], posters: [] };
  }
};
