import { useState, useEffect, useContext } from 'react';

import { MatchCard } from '../../components/MatchCard/MatchCard';

import * as footballService from '../../services/football';
import { GridContext } from '../../contexts/GridContext';

export const Home = () => {
  const [matches, setMatches] = useState([]);
  const { grid } = useContext(GridContext);

  useEffect(() => {
    footballService.getLiveMatches()
      .then(data => setMatches(data))
      .catch((err) => console.log('err', err))
  }, []);

  return (
    <div className={`${grid === 'grid' ? 'grid grid-cols-7 w-full' : 'flex flex-col w-[768px]'}`}>
      {matches.map((m, i) => (
        <div key={i + 1 * Math.random()}>
          <MatchCard matchData={m} />
        </div>
      ))}
    </div>
  )
}