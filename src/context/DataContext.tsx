import { getAllGames } from '@/services/football';
import { format } from 'date-fns';
import { createContext, useCallback, useEffect, useState } from 'react';

export interface Game {
  fixture: {
    status: {
      long: string;
    };
  };
  league: {
    country: string;
  };
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
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
  const [data, setData] = useState([]);
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