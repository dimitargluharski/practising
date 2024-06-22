import { useState, useEffect, useContext, useRef } from 'react';

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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const slideoutRef = useRef<HTMLDivElement | null>(null);
  const [_, setSelectedMatch] = useState(null);

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
        const filtered = matches.filter(match => match.teams.home.name.toLowerCase().includes(query.toLowerCase()) || match.teams.away.name.toLowerCase().includes(query.toLowerCase()));
        console.log('filtered', filtered);
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (slideoutRef.current && !slideoutRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleSlideoutComponent = (match:any) => {
    setSelectedMatch(match);
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className='w-full'>
        <div className={`m-auto ${grid === 'grid' ? 'grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 w-full' : 'flex flex-col w-[768px]'}`}>
          {matches.length === 0
            ? 'There are no live matches'
            : loading
              ? <Loading />
              : filteredMatches.map((m, i) => (
                <div key={i + 1 * Math.random()} className='transition hover:space-y-2'>
                  <MatchCard matchData={m} handleToggleSlideoutComponent={() => handleToggleSlideoutComponent(m)} />
                </div>
              ))}
        </div>
      </div>
      {/* {isClicked && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
          <div ref={slideoutRef}>
            <Slideout matchObject={selectedMatch} />
          </div>
        </>
      )} */}
    </>
  )
}