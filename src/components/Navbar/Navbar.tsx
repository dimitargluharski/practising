import { NavLink } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { FiTv } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";

export const Navbar = () => {
  return (
    <nav className="flex flex-col gap-5 justify-center h-dvh p-5 bg-slate-900">
      <NavLink
        to="/"
        className={({ isActive }) => `${isActive ? 'text-yellow-500' : 'text-slate-500'}`}
        title="Dashboard"
      >
        <MdOutlineDashboard className="w-7 h-7" />
      </NavLink>

      <NavLink to="/live"
        className={({ isActive }) => `${isActive ? 'text-yellow-500' : 'text-slate-500'}`}
        title="Live"
      >
        <FiTv className="w-7 h-7" />
      </NavLink>

      <NavLink to="/fixtures"
        className={({ isActive }) => `${isActive ? 'text-yellow-500' : 'text-slate-500'}`}
        title="Fixtures"
      >
        <FiClock className="w-7 h-7" />
      </NavLink>
    </nav >
  )
}