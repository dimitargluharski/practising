import { useLocation, NavLink } from 'react-router-dom';
import { BsFillDisplayFill } from "react-icons/bs"; // TV icon
import { GiSoccerBall } from "react-icons/gi"; // Soccer ball icon
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import ToggleButton from './ToggleButton/ToggleButton';

import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
const NavItem = ({ to, children }: any) => {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`flex justify-center items-center font-semibold rounded-md text-4xl p-2 m-3 ${theme === 'dark' ? 'text-slate-50' : ''} ${isActive ? 'bg-slate-600 text-slate-50' : ''}`}
        >
            {children}
        </NavLink>
    );
};

const Navbar = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <nav className={`flex flex-col h-full text-xl justify-between ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-400'} mr-4 rounded-md`}>
            <div>
                <NavItem to="/" title="dashboard">
                    <GiSoccerBall />
                </NavItem>

                <NavItem to="/videos" title="videos">
                    <BsFillDisplayFill />
                </NavItem>

                <NavItem to="/fixtures" title="fixtures">
                    <FaRegCalendarAlt />
                </NavItem>
            </div>

            <div className='flex w-full justify-center items-center p-5'>
                <span className={`${theme === 'dark' ? 'text-slate-200' : 'text-yellow-500'}`}>
                    <IoSunnyOutline />
                </span>
                <ToggleButton />
                <span className={`${theme === 'dark' ? 'text-yellow-500' : 'text-slate-900'}`}>
                    <IoMoon />
                </span>
            </div>
        </nav>
    )
}

export default Navbar;