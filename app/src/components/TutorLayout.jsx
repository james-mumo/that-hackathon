import { Outlet, NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SatelliteIcon from '@mui/icons-material/Satellite';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import DevicesIcon from '@mui/icons-material/Devices';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function TutorLayout() {
  let navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("classData");
    navigate('/');
  };
  return (
    <div className="h-screen relative flex flex-col items-center bg">
      <Outlet />
      <div className="flex gap-1 absolute bottom-5 border w-fit bg-slate-950 rounded-tl-full rounded-bl-full rounded-tr-full rounded-br-full p-5">
        <NavLink to="/tutor/dashboard"
          className="text-gray-300 hover:text-gray-400 font-semibold text-[18px] border-r pl-5 pr-5 flex justify-center items-center gap-1">
          <DashboardIcon />
          Dashboard
        </NavLink>
        <NavLink
          to="/tutor/contentupload"

          className="text-gray-300 hover:text-gray-400 font-semibold text-[18px] border-r pl-5 pr-5 flex justify-center items-center gap-1">
          <SatelliteIcon /> Content Sharing
        </NavLink>
        <NavLink
          to="/tutor/announcements"

          className="text-gray-300 hover:text-gray-400 font-semibold text-[18px] border-r pl-5 pr-5 flex justify-center items-center gap-1">
          <SurroundSoundIcon /> Exams & Announcements
        </NavLink>
        <NavLink to="/tutor/class"
          className="text-gray-300 hover:text-gray-400 font-semibold text-[18px] border-r pl-5 pr-5 flex justify-center items-center gap-1">
          <DevicesIcon /> Class NameSession
        </NavLink>
        <NavLink
          to="/tutor/live-session"
          className="text-gray-300 hover:text-gray-400 font-semibold text-[18px] border-r pl-5 pr-5 flex justify-center items-center gap-1">
          <CastForEducationIcon /> Live Session
        </NavLink>
        <span
          onClick={handleLogout}

          className="text-gray-300 hover:text-gray-400 font-semibold text-[18px] border pl-5 pr-5 flex justify-center items-center gap-1">
          <ExitToAppIcon /> Logout
        </span>
      </div>
    </div>
  );
}

export default TutorLayout;
