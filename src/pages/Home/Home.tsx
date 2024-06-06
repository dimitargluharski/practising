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
  const [loading, setLoading] = useState<boolean>(false);

  const { grid } = useContext(GridContext);

  useEffect(() => {
    setLoading(true)
    footballService.getLiveMatches()
      .then(data => {
        setMatches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err)
        setLoading(false);
      })
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

  const Loading = () => {
    return (
      <div>Fetching data...</div>
    )
  }

  return (
    <div className={`${grid === 'grid' ? 'grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 w-full' : 'flex flex-col w-[768px]'}`}>
      {matches.length === 0
        ? 'There is no live matches'
        : loading
          ? <Loading />
          : filteredMatches.map((m, i) => (
            <div key={i + 1 * Math.random()}>
              <MatchCard matchData={m} />
            </div>
          ))}
    </div>
  )
}