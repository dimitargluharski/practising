import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarComponentProps {
  calendarDate: Date | string;
  handleChangeCalendarDay: (calendarDate: Date) => void;
}

export const CalendarComponent = ({ calendarDate, handleChangeCalendarDay }: CalendarComponentProps) => {
  return (
    <Calendar
      className="h-full w-full"
      defaultActiveStartDate={new Date()}
      selectRange={false}
      // @ts-ignore
      onChange={handleChangeCalendarDay}
      value={calendarDate}
    />
  );
};
