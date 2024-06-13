// @TODO: Write an abstraction

import { useState, useEffect } from 'react';

import * as FootballService from '../../services/football';
import { LeagueDetails } from '../LeagueDetails/LeagueDetails';
import { VenueDetails } from '../VenueDetails/VenueDetails';
import { MatchEvents } from '../MatchEvents/MatchEvents';

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
          {/* @TODO: check text size */}


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

          <div className='w-full bg-slate-400 rounded-md'>
            {details.length > 0 ? details.map((x: any, index) => <div key={index}>
              <div className='flex items-center gap-x-2 py-2'>
                <div>
                </div>
                <div className='w-10 h-10'>
                  <img src={x.teams.home.logo} alt="" />
                </div>
                <div>
                  {x.teams.home.name}
                </div>
                <div>
                  {x.goals.home}
                </div>
                -
                <div>
                  {x.goals.away}
                </div>
                <div>
                  {x.teams.away.name}
                </div>
                <div className='h-10 w-10'>
                  <img src={x.teams.away.logo} alt="" className='h-full w-full' />
                </div>
              </div>
            </div>) : null}
          </div>

          <div className='w-full bg-slate-400 rounded-md'>
            {details.length > 0 ? details.map((x, index) => <div key={index}>
              <MatchEvents match={x} />
            </div>) : null}
          </div>
        </div>
      )}
    </div>
  )
}
