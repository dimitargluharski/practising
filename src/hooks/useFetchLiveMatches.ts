import { useEffect, useState } from "react";
import { API_KEY } from "../consts/api-key";
import { API_HOST } from "../consts/api-host";

export const useFetchLiveMatches = (address: string) => {
  const [liveMatches, setLiveMatches] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

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