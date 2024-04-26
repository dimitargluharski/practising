import { DashboardCards } from "../../components/DashbaordCards/DashboardCards";

const Dashboard = () => {
    return (
        <div className="flex justify-center w-full p-2 space-x-14">
            <DashboardCards />
            <DashboardCards />
            <DashboardCards />
            <DashboardCards />
        </div>
    )
}

export default Dashboard;