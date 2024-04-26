import { IoGrid, IoList } from "react-icons/io5";
import { Link, Route, Routes } from "react-router-dom"
import { useLocation } from "react-router-dom"

export const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col justify-center p-2 w-[300px] h-screen bg-slate-500">
            <Link to="/dashboard" className={`flex flex-row items-center p-2 font-medium hover:bg-slate-400 ${location.pathname === '/dashboard' ? 'bg-slate-400' : ''}`}>
                <IoGrid />
                <span className="ml-1">
                    Dashboard
                </span>
            </Link>
            <Link to="/live-matches" className={`flex flex-row items-center p-2 font-medium hover:bg-slate-400 ${location.pathname === '/live-matches' ? 'bg-slate-400' : ''}`}>
                <span className="space-2">
                    <IoList />
                </span>
                <span className="ml-1">
                    Fixtures
                </span>
            </Link>

            <Routes>
                <Route path="/dashboard" />
                <Route path="/live-matches" />
            </Routes>
        </div>
    )
}

{/* <Routes>
<Route path='/' element={<Dashboard />} />
<Route path="/match-details/:matchId" element={<MatchDetails />} />
<Route path='*' element={<div>404...</div>} />
</Routes> */}