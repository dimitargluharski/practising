interface DashboardCardsProps {
    title: string;
    count: number;
    icon: JSX.Element;
    background: string;
    color: string;
}

export const DashboardCards = ({title, count, icon, background, color}: DashboardCardsProps) => {
    return (
        <div className="flex p-2 border rounded-md flex-1 bg-slate-400 text-white">
            <div className={`flex flex-col self-center ${background} ${color} rounded-md p-2 mr-2`}>
                {icon}
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <div className="text-sm italic">{title}</div>
                <div className="text-xl font-bold">{count}</div>
            </div>
        </div>
    )
}