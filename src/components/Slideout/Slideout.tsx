// @TODO: Write an abstraction

import { useState, useEffect } from 'react';

import * as FootballService from '../../services/football';
import { LeagueDetails } from '../LeagueDetails/LeagueDetails';
import { VenueDetails } from '../VenueDetails/VenueDetails';

export const Slideout = ({ matchObject }: any) => {
  const [_, setStatistics] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { fixture: { id } } = matchObject;

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the component mounts
    Promise.all([
      FootballService.getButterflyStatistics(id),
      FootballService.getMatchDetails(id)
    ]).then(([statisticsData, detailsData]) => {
      setStatistics(statisticsData);
      setDetails(detailsData);
    }).catch((err) => {
      console.log('error', err);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  // @TODO: import theme context
  return (
    <div className="min-h-screen w-[calc(100vw-70%)] absolute top-0 right-0 dark:bg-slate-800 bg-slate-400 text-slate-50 p-5 z-20 overflow-none">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="spinner">Loading...</div>
        </div>
      ) : (
        <div className='flex flex-col gap-y-2'>
          <div className='w-full bg-slate-400 rounded-md'>
            {details.length > 0 ? details.map((x, index) => <div key={index}>
              <LeagueDetails dataObject={x} />
            </div>) : null}
          </div>

          <div className='w-full bg-slate-400 rounded-md gap-y-1'>
            {details.length > 0 ? details.map((x, index) => <div key={index}>
              <VenueDetails venue={x} />
            </div>) : null}
          </div>
        </div>
      )}
    </div>
  )
}
