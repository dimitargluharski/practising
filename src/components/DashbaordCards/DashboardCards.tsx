import { PiTelevisionSimpleLight } from "react-icons/pi";

export const DashboardCards = () => {
    return (
        <div className="flex p-2 border rounded-sm flex-1 bg-slate-500 border-slate-500 text-white">
            <div className="flex flex-col self-center bg-slate-300 rounded-md p-2 mr-2">
                <PiTelevisionSimpleLight size={45} color="black" />
            </div>

            <div className="flex flex-col justify-center">
                <div className="text-xl font-bold">212131312</div>
                <div className="text-sm italic">live on tv</div>
            </div>
        </div>
    )
}