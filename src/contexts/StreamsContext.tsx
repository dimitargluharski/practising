import { ReactNode, createContext } from 'react';
import data from '../match_data_with_details.json';

export interface StreamContextProps {
  children: ReactNode;
}

export interface Match {
  link: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  matchData: any[];
  scriptSrc: string[];
  videoSrc: any[];
  iframeSrc: string[];
}

export interface StreamContextValue {
  upcomingMatches: Match[];
}

export const StreamsContext = createContext<StreamContextValue | null>(null);

export const StreamProvider = ({ children }: StreamContextProps) => {
  const currentTime = new Date();

  const upcomingMatches = data.filter((match: Match) => {
    const matchTime = new Date(match.time);
    return matchTime >= currentTime;
  });

  const streams: StreamContextValue = {
    upcomingMatches,
  };

  return (
    <StreamsContext.Provider value={streams}>
      {children}
    </StreamsContext.Provider>
  );
};
