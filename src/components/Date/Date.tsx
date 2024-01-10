import moment from 'moment';
import { useEffect, useState } from 'react';

interface DateProps {
    date: string;
    status: Status;
}

interface Status {
    elapsed: number | null;
}

const Date = ({ date, status }: DateProps) => {
    const localTime = moment(date).format('HH:mm');
    const [elapsedTime, setElapsedTime] = useState<number | null>(status.elapsed);
    const [displayTime, setDisplayTime] = useState<string | null>(status.elapsed !== null ? `${status.elapsed}'` : localTime);

    useEffect(() => {
        if (status.elapsed !== null) {
            const timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime !== null ? prevTime + 1 : null);
            }, 60000); // 60000 milliseconds = 1 minute

            // Clear interval on component unmount
            return () => clearInterval(timer);
        }
    }, [status.elapsed]);

    useEffect(() => {
        setDisplayTime(elapsedTime !== null ? `${elapsedTime}'` : localTime);
    }, [elapsedTime, localTime]);

    return (
        <div>
            {displayTime}
        </div>
    )
}

export default Date;