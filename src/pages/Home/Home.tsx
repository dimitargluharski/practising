import Card from "../../components/Card/Card";
import { BsFillDisplayFill } from "react-icons/bs"; // TV icon
import { GiSoccerBall } from "react-icons/gi"; // Soccer ball icon
import { MdOndemandVideo } from "react-icons/md"; // Video icon

const Home = () => {
    return (
        <div className="w-full bg-slate-400">
            <div className="flex justify-center w-full text-slate-50 mt-14">
                <Card Icon={BsFillDisplayFill} text="19" />
                <Card Icon={GiSoccerBall} text="5000" />
                <Card Icon={MdOndemandVideo} text="1000" />
            </div>
            <div>panels</div>
        </div >
    )
}

export default Home;