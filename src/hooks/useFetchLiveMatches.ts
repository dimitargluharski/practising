import { useEffect, useState } from "react";
import { API_KEY } from "../consts/api-key";
import { API_HOST } from "../consts/api-host";

export type Match = {
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
};

export const useFetchLiveMatches = (address: string) => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const options: object = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(address, options)
      .then(res => res.json())
      .then(data => {
        setLiveMatches(data.response);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log('err', err)
      })
      .finally(() => {
        console.log('finally')
        setIsLoading(false)
      })
  }, []);

  return {
    liveMatches,
    isLoading
  }
};