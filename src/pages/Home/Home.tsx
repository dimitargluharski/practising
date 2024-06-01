import { useState, useEffect, useContext } from 'react';

import { MatchCard } from '../../components/MatchCard/MatchCard';

import * as footballService from '../../services/football';
import { GridContext } from '../../contexts/GridContext';

type Match = {
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
};

export const Home = ({ query }: any) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  
  const { grid } = useContext(GridContext);

  useEffect(() => {
    footballService.getLiveMatches()
      .then(data => setMatches(data))
      .catch((err) => console.log('err', err))
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        const filtered = matches.filter(match => match?.teams.home.name.toLowerCase().includes(query.toLowerCase()) || match?.teams.away.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredMatches(filtered);
      } else {
        setFilteredMatches(matches);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query, matches]);

  return (
    <div className={`${grid === 'grid' ? 'grid grid-cols-7 w-full' : 'flex flex-col w-[768px]'}`}>
      {filteredMatches.length === 0
        ? 'There is no results'
        : filteredMatches.map((m, i) => (
          <div key={i + 1 * Math.random()}>
            <MatchCard matchData={m} />
          </div>
        ))}
    </div>
  )
}