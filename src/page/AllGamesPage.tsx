import { useEffect, useState } from "react";
import { getAllGames } from "../services/football";

export const AllGamesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllGames()
      .then((data) => console.log(data)) // `data` is already the parsed response
      .catch((err) => console.error('Error fetching games:', err));
  }, []);

  return (

  )
}