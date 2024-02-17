import Calendar from "../../components/Calendar/Calendar";
import InputField from "../../components/InputField/InputField";
import Fixtures from "../Fixtures/Fixtures";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import Stream from "../../components/Stream/Stream";

const Dashboard = () => {
    return (
        <div className="w-[1024px] h-[100vh] m-auto">
            <div className="flex py-3 relative">
                {/* @ts-ignore */}
                <InputField />

                <div className="absolute -right-2 top-5">
                    <ToggleButton />
                </div>
            </div>

            <div className="flex w-full bg-slate-500 rounded-md">
                <div className="flex-grow flex flex-1 flex-col justify-center">
                    <Calendar />
                    <Stream />
                </div>

                <div className="flex-grow flex-1 ">
                    <Fixtures />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;