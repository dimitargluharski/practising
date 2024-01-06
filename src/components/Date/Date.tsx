import moment from 'moment';

interface DateProps {
    date: string;
    status: Status;
}

interface Status {
    elapsed: number | null;
}

const Date = ({ date, status }: DateProps) => {
    const localTime = moment(date).format('HH:mm');
    const displayTime = status.elapsed !== null ? status.elapsed : localTime;

    return (
        <div>
            {displayTime}'
        </div>
    )
}

export default Date;