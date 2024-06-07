// import { useContext } from 'react';
// import { GridContext } from '../../contexts/GridContext';
// import { StreamsContext } from '../../contexts/StreamsContext';

// import { MatchCard } from '../../components/MatchCard/MatchCard';

// export const Streams = () => {
//   const { grid } = useContext(GridContext);
//   const streamsContext = useContext(StreamsContext);

//   if (!streamsContext) {
//     return <div>Loading...</div>;
//   }

//   const { upcomingMatches } = streamsContext;

//   return (
//     <div className={`${grid === 'grid' ? 'grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 w-full' : 'flex flex-col w-[768px]'}`}>
//       {upcomingMatches.length === 0 ? (
//         upcomingMatches.map((match, index) => <MatchCard key={index} {...match} />)
//       ) : (
//         <div>There are no live streams.</div>
//       )}
//     </div>
//   );
// };

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Team } from '../../components/Team/Team';
import { ThemeContext } from '../../contexts/ThemeContext';
import { GridContext } from '../../contexts/GridContext';
import { StreamsContext } from '../../contexts/StreamsContext';

interface MatchCardProps {
  awayTeam: string;
  homeTeam: string;
  iframeSrc: string[];
  link: string;
  matchData: any[];
  scriptSrc: string[];
  time: string;
  videoSrc: any[];
}


const MatchCard = ({ awayTeam, homeTeam, time, link }: MatchCardProps) => {
  const { theme } = useContext(ThemeContext);

  const localTime = moment.utc(time, "HH:mm").local().format("HH:mm");

  return (
    <Link to={link} className={`flex items-center overflow-hidden shadow rounded-md p-2 gap-x-2 m-1 ${theme === 'light' ? 'rounded-md text-white bg-slate-800' : 'bg-slate-200 text-black'}`}>
      <div>{localTime}</div>
      <div className='truncate'>
        <Team logo='' name={homeTeam} />
        <Team logo='' name={awayTeam} />
      </div>
    </Link>
  );
};

export const Streams = () => {
  const { grid } = useContext(GridContext);
  const streamsContext = useContext(StreamsContext);

  if (!streamsContext) {
    return <div>Loading...</div>;
  }

  const { upcomingMatches } = streamsContext;

  return (
    <div className={`${grid === 'grid' ? 'grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 w-full' : 'flex flex-col w-[768px]'}`}>
      {upcomingMatches.length > 0 ? (
        upcomingMatches.map((match, index) => <MatchCard key={index} {...match} />)
      ) : (
        <div>There are no live streams.</div>
      )}
    </div>
  );
};