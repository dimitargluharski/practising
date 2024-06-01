import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as footballService from '../../services/football';

import { ButterflyStatistics } from "../../components/ButterflyStatistics/ButterflyStatistics";

export const MatchDetails = () => {
  const [data, setData] = useState([]);
  const { matchId } = useParams();

  useEffect(() => {
    if (matchId) {
      footballService.getMatchDetails(matchId)
        .then(data => setData(data))
        .catch((err) => console.log(err));
    }
  }, [matchId]);

  const details = data[0];

  console.log(details);

  return (
    <div>
      
    </div>
  );
};
