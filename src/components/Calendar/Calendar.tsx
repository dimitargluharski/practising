import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarComponentProps {
  calendarDate: Date | string;
  handleChangeCalendarDay: (calendarDate: Date) => void;
}

export const CalendarComponent = ({ calendarDate, handleChangeCalendarDay }: CalendarComponentProps) => {
  return (
    <Calendar
      defaultActiveStartDate={new Date()}
      selectRange={false}
      className="flex flex-col justify-center"
      // @ts-ignore
      onChange={handleChangeCalendarDay}
      value={calendarDate}
    />
  );
};
