import { PiTelevisionSimpleLight } from "react-icons/pi";

import { DashboardCards } from "../../components/DashbaordCards/DashboardCards";

const Dashboard = () => {
    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex justify-center w-full px-2 gap-5">
                <DashboardCards
                    icon={<PiTelevisionSimpleLight size={45} />}
                    title="live on television"
                    count={212131312}
                    background="bg-red-500"
                    color="white"
                />
                <DashboardCards
                    icon={<PiTelevisionSimpleLight size={45} />}
                    title="upcoming matches"
                    count={4400}
                    background="bg-pink-500"
                    color="white"
                />
                <DashboardCards
                    icon={<PiTelevisionSimpleLight size={45} />}
                    title="playing"
                    count={2000}
                    background="bg-green-500"
                    color="white"
                />
                <DashboardCards
                    icon={<PiTelevisionSimpleLight size={45} />}
                    title="lastest matches"
                    count={212131312}
                    background="bg-sky-200"
                    color="white"
                />
                <DashboardCards
                    icon={<PiTelevisionSimpleLight size={45} />}
                    title="highlights"
                    count={22}
                    background="bg-cyan-500"
                    color="white"
                />
            </div>
        </div>
    )
}

export default Dashboard;