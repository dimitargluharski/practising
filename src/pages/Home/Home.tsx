import { useState, useEffect, useRef, useContext } from 'react';
import { MatchCard } from '../../components/MatchCard/MatchCard';
import { GridContext } from '../../contexts/GridContext';
import { Match, useFetchLiveMatches } from '../../hooks/useFetchLiveMatches';
import { Slideout } from '../../components/Slideout/Slideout';

type HomeProps = {
  query: string;
};

export const Home = ({ query }: HomeProps) => {
  const [filteredMatches, setFilteredMatches] = useState<Match[] | []>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const slideoutRef = useRef<HTMLDivElement | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { grid } = useContext(GridContext);

  const { liveMatches, isLoading } = useFetchLiveMatches('https://v3.football.api-sports.io/fixtures?live=all');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        const filtered = liveMatches.filter(match =>
          match?.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
          match?.teams.away.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMatches(filtered);
      } else {
        setFilteredMatches(liveMatches);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query, liveMatches]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slideoutRef.current && !slideoutRef.current.contains(event.target as Node)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleSlideoutComponent = (match: Match) => {
    setSelectedMatch(match);
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className='w-full'>
        <div className={`m-auto ${grid === 'grid' ? 'grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 w-full' : 'flex flex-col w-[768px]'}`}>
          {isLoading ? (
            <div>Fetching data...</div>
          ) : liveMatches.length === 0 ? (
            <div>There are no live matches</div>
          ) : (
            filteredMatches.map((match, index) => (
              <>
                <div key={index} className='transition hover:space-y-2'>
                  <MatchCard matchData={match} handleToggleSlideoutComponent={() => handleToggleSlideoutComponent(match)} />
                </div>
              </>
            ))
          )}
        </div>
      </div>
      {isClicked && (
        <div
          className={`fixed top-0 left-0 w-full h-screen  backdrop-filter backdrop-blur-sm`}
          ref={slideoutRef}
          onClick={() => setIsClicked(false)}
        >
          <Slideout matchObject={selectedMatch} slideoutRef={slideoutRef} handleClick={setIsClicked} />
        </div>
      )}
    </>
  );
};
