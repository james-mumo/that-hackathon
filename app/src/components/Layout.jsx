import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ClassIcon from '@mui/icons-material/Class';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import SpeedIcon from '@mui/icons-material/Speed';
import NearbyOffIcon from '@mui/icons-material/NearbyOff';
import ExitToApp from "@mui/icons-material/ExitToApp";

const Layout = () => {
  const location = useLocation();
  let navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("classData");
    navigate('/');
  };
  return (
    <div className="flex flex-col h-screen p-0">
      <div className="flex flex-row">
        <div className="h-[100vh] w-1/5 bg-[#0a1329]">
          <div className="flex flex-col w-full border-b font-bold px-4 py-3 justify-center items-center">
            <span className="text-4xl flex justify-center items-center">
              {" "}
              <ImportantDevicesIcon fontSize="large" /> ElimTech
            </span>
          </div>

          <div className="h-fit text-white flex flex-col py-0 gap-0">
            <NavLink
              to="/student/dashboard"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <ImportantDevicesIcon /> Dashboard
            </NavLink>

            <NavLink
              to="/student/map"
              activeStyle={{ color: "red" }}
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <AutoStoriesIcon /> Map
            </NavLink>

            <NavLink
              to="/student/transit"
              activeStyle={{ color: "red" }}
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <AutoStoriesIcon /> CareTransit
            </NavLink>

            <NavLink
              to="/student/alltransit"
              activeStyle={{ color: "red" }}
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <AutoStoriesIcon /> View Available
            </NavLink>

            <NavLink
              to="/student/search"
              activeStyle={{ color: "red" }}
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <AutoStoriesIcon /> Search Transit
            </NavLink>

            <NavLink
              to="/student/settings"
              activeStyle={{ color: "red" }}
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <AutoStoriesIcon /> Settings
            </NavLink>

            <NavLink
              to="/student/library"
              activeStyle={{ color: "red" }}
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <AutoStoriesIcon /> Library
            </NavLink>

            <NavLink
              to="/student/content-sharing"
              activeClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <ScreenShareIcon />
              Content Sharing
            </NavLink>
            <NavLink
              to="/student/ai"
              activeClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <PrecisionManufacturingIcon />
              AI Playground
            </NavLink>

            <NavLink
              to="/student/coursedash"
              activeClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <SpaceDashboardIcon />
              Course Dashboard
            </NavLink>

            <NavLink
              to="/student/class"
              activeClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <ClassIcon />
              Classes
            </NavLink>

            <NavLink
              to="/student/liveclass"
              activeClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <ConnectedTvIcon />
              Live Sessions
            </NavLink>

            <NavLink
              to="/student/exam"
              activeClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3"
              exact
            >
              <SpeedIcon />
              Exams
            </NavLink>

            <span
              onClick={handleLogout}
              cactiveClassName="text-blue-500"
              className="text-white active:text-teal-500 font-semibold text-lg flex justify-start items-center py-3 px-5 gap-3 cursor-pointer hover:text-red-600"
            >
              <NearbyOffIcon /> Logout
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col flex-1 p-0 bg-white z-10 overflow-y-hidden ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
