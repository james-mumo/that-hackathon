import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
// import { Garage } from "@mui/icons-material";
import { appName } from "../../other_pages/utils/data";
import logo from "../../assets/bus.png";
// import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

function LoggedHeader() {
  const [activeItem, setActiveItem] = useState("Home");
  const location = useLocation();
  const history = useNavigate();

  React.useEffect(() => {
    const pathName = location.pathname;
    const active = pathName.substring(pathName.lastIndexOf("/") + 1);
    setActiveItem(active.charAt(0).toUpperCase() + active.slice(1));
  }, [location.pathname]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const searchQuery = e.target.value.trim();
      if (searchQuery) {
        history(`/student/search?q=${searchQuery}`);
      }
    }
  };

  return (
    <div className="flex py-1 px-3 bg-gray-900 w-full pb-2">
      <span className="text-lg mr-4  cursor-pointer font-bold ml-10 flex items-center gap-1">
        <img src={logo} alt="" className="h-8 " />
        {appName}
      </span>
      <div class="flex flex-1 justify-end">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search route..."
          className="rounded-md outline-none border-yellow-500 border focus:no-underline mr-2 px-3 w-2/3"
          onKeyDown={handleSearch}
        />
        {/* <TroubleshootIcon className="text-yellow-400" /> */}
        {/* <Link
          to="/settings"
          className={`hover:text-gray-200 cursor-pointer transition duration-300 p-1 rounded-md flex items-center flex-row gap-0 ${
            activeItem === "Settings" ? "text-yellow-400" : "text-gray-200"
          }`}
        >
          <Garage className="mx-1 cursor-pointer" />
          Settings 
        </Link>
        */}
      </div>
    </div>
  );
}

export default LoggedHeader;
