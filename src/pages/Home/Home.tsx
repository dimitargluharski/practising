import { useState, useEffect, useContext, useRef } from 'react';

import { MatchCard } from '../../components/MatchCard/MatchCard';

import * as footballService from '../../services/football';
import { GridContext } from '../../contexts/GridContext';
import { Slideout } from '../../components/Slideout/Slideout';

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
  const slideoutRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (slideoutRef.current && !slideoutRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleSlideoutComponent = () => {
    setIsClicked(!isClicked);
    console.log('isClicked', isClicked);
  }

  return (
    <>
      <div className={`relative w-full ${isClicked ? 'bg' : ''}`}>
        <div className={`${grid === 'grid' ? 'grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 w-full' : 'flex flex-col w-[768px]'}`}>
          {matches.length === 0
            ? 'There are no live matches'
            : loading
              ? <Loading />
              : filteredMatches.map((m, i) => (
                <div key={i + 1 * Math.random()}>
                  <MatchCard matchData={m} handleToggleSlideoutComponent={handleToggleSlideoutComponent} />
                </div>
              ))}
        </div>
      </div>
      {isClicked && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
          <div ref={slideoutRef}>
            <Slideout />
          </div>
        </>
      )}
    </>
  )
}