import { format } from 'date-fns';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getAllGames } from '../services/football';

export interface Game {
  fixture: {
    id: number;
    data: Date;
    // referee: null 
    status: Status;
    venue: Venue;
  };
  goals: {
    home: number; // null
    away: number; // null
  };
  league: {
    id: number;
    country: string;
    flag: string;
    logo: string;
    name: string;
    round: string;
    season: number;
  };
  score: {
    extraTime: ExtraTime;
    fullTime: FullTime;
    halfTime: HalfTime;
    penalty: Penalty;
  };
  teams: {
    home: HomeTeam;
    away: AwayTeam;
  }
};

export type Status = {
  elapsed: string; // null
  extra: string; // null
  long: string;
  short: string;
};

export type Venue = {
  id: number;
  city: string;
  name: string;
};

export type ExtraTime = {
  home: number;
  away: number;
}

export type FullTime = {
  home: number; // null
  away: number;
}

export type HalfTime = {
  home: number; // null
  away: number;
}

export type Penalty = {
  home: number; // null
  away: number;
}

export type HomeTeam = {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export type AwayTeam = {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface DataProviderContext {
  children: React.ReactNode;
}

export interface DataContextProps {
  data: Game[];
  calendarDate: string;
  handleChangeCalendarDay: (selectedDate: Date) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderContext) => {
  const [data, setData] = useState<Game[]>([]);
  const [calendarDate, setCalendarDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const handleChangeCalendarDay = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    setCalendarDate(formattedDate);
  };

  const fetchGames = useCallback(() => {
    getAllGames(calendarDate)
      .then((res) => setData(res))
      .catch((err) => console.error("Error fetching games:", err));
  }, [calendarDate]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const extractedData = {
    data,
    handleChangeCalendarDay,
    calendarDate
  }

  return (
    <DataContext.Provider value={extractedData}>
      {children}
    </DataContext.Provider>
  )
};