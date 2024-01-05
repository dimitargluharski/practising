import { useLocation, NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { BsFillDisplayFill } from "react-icons/bs"; // TV icon
import { GiSoccerBall } from "react-icons/gi"; // Soccer ball icon
import { MdOndemandVideo } from "react-icons/md"; // Video icon

const NavItem = ({ to, children }: any) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`flex justify-center items-center font-semibold rounded-md text-4xl p-2 mx-5 ${isActive ? 'bg-red-600 p-2 mx-5 text-slate-50' : ''}`}
        >
            {children}
        </NavLink>
    );
};

const Navbar = () => {
    return (
        <nav className='flex flex-col justify-center bg-slate-300 h-screen'>
            <NavItem to="/" title="dashboard">
                <MdDashboard />
            </NavItem>

            <NavItem to="/tv" title="tv">
                <BsFillDisplayFill />
            </NavItem>

            <NavItem to="/live" title="live">
                <GiSoccerBall />
            </NavItem>

            <NavItem to="/videos" title="videos">
                <MdOndemandVideo />
            </NavItem>
        </nav >
    )
}

export default Navbar;