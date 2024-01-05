import { IconType } from 'react-icons';

interface CardProps {
    Icon: IconType;
    text: string;
}

const Card = ({ Icon, text }: CardProps) => {
    return (
        <div className='p-5 bg-slate-300 flex items-center font-semibold text-4xl rounded-lg mx-2 text-slate-950'>
            <Icon size="60px" />
            <p className='ml-2 text-slate-950'>{text}</p>
        </div>
    )
}

export default Card;