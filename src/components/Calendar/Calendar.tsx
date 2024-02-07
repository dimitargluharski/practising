import { useState } from 'react';

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Calendar = ({ handleClick }: any) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = `${year}-${String(month + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const isToday = day === date.getDate();

        return { date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`, isCurrentMonth: true, isToday };
    });

    const onDayClick = (day: any) => {
        setSelectedDate(day.date);
        handleClick(day);
    }

    return (
        <div>
            <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-gray-200">
                {days.map((day, dayIdx) => (
                    <button
                        key={day.date}
                        type="button"
                        onClick={() => onDayClick(day)}
                        className={classNames(
                            'py-1.5 hover:bg-gray-100 focus:z-10',
                            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                            (day.date === selectedDate || day.date === today) && 'font-semibold',
                            day.date === selectedDate && 'text-white',
                            day.date !== selectedDate && day.isCurrentMonth && day.date !== today && 'text-gray-900',
                            day.date !== selectedDate && !day.isCurrentMonth && day.date !== today && 'text-gray-400',
                            day.date === today && day.date !== selectedDate && 'text-slate-50 bg-slate-900',
                            dayIdx === 0 && 'rounded-tl-lg',
                            dayIdx === 6 && 'rounded-tr-lg',
                            dayIdx === days.length - 7 && 'rounded-bl-lg',
                            dayIdx === days.length - 1 && 'rounded-br-lg'
                        )}
                    >
                        <time
                            dateTime={day.date}
                            className={classNames(
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                day.date === selectedDate && day.date === today && 'bg-indigo-600',
                                day.date === selectedDate && day.date !== today && 'bg-gray-900'
                            )}
                        >
                            {/* @ts-ignore */}
                            {day.date.split('-').pop().replace(/^0/, '')}
                        </time>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Calendar;