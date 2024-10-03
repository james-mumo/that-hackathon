import React, { useState } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import ListRoutes from "../../other_pages/components/search/ListRoutes";
import ListBuses from "../../other_pages/components/search/ListBuses";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ListVans from "../../other_pages/components/search/ListVans";
import ListMinibuses from "../../other_pages/components/search/ListMinibuses";
import Notice from "../../other_pages/screens/Notice";
import Logistics from "../../other_pages/screens/Logistics";

function Summ() {
  const [activeItem, setActiveItem] = useState("Routes");

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-row relative h-screen overflow-y-scroll bg-gray-900 w-full gap-0">
      <div class="flex flex-col w-2/3">
        <div className="flex flex-col flex-1 h-max">
          <div className="flex flex-row h-[35px] justify-evenly gap-2 pb-2 overflow-x-auto mt-0 left-0 z-10 right-0 bg-gray-900 sticky top-0">
            <ArrowBackIosNew className="text-gray-400 text-sm" />

            <span
              onClick={() => handleClick("Routes")}
              className={`gap-1 flex cursor-pointer px-3 ${
                activeItem === "Routes" ? "border-b-2 border-yellow-400" : ""
              } focus:border-b-2 focus:border-yellow-400`}
            >
              <ForkRightIcon
                style={{
                  color: activeItem === "Routes" ? "yellow" : "inherit",
                }}
              />
              <span className="font-bold">Routes</span>
            </span>

            <span
              onClick={() => handleClick("Buses")}
              className={`gap-1 flex cursor-pointer px-3 ${
                activeItem === "Buses" ? "border-b-2 border-yellow-400" : ""
              } focus:border-b-2 focus:border-yellow-400`}
            >
              <DirectionsBusIcon
                style={{
                  color: activeItem === "Buses" ? "yellow" : "inherit",
                }}
              />
              <span className="font-bold">Buses</span>
            </span>
            <span
              onClick={() => handleClick("Minibuses")}
              className={`gap-1 flex cursor-pointer px-3 ${
                activeItem === "Minibuses" ? "border-b-2 border-yellow-400" : ""
              } focus:border-b-2 focus:border-yellow-400`}
            >
              <AirportShuttleIcon
                style={{
                  color: activeItem === "Minibuses" ? "yellow" : "inherit",
                }}
              />
              <span className="font-bold">Minibuses</span>
            </span>
            <span
              onClick={() => handleClick("Vans")}
              className={`gap-1 flex cursor-pointer px-3 ${
                activeItem === "Vans" ? "border-b-2 border-yellow-400" : ""
              } focus:border-b-2 focus:border-yellow-400`}
            >
              <ElectricCarIcon
                style={{
                  color: activeItem === "Vans" ? "yellow" : "inherit",
                }}
              />
              <span className="font-bold">Vans</span>
            </span>
            <span
              onClick={() => handleClick("Favourites")}
              className={`gap-1 flex cursor-pointer px-3 ${
                activeItem === "Favourites"
                  ? "border-b-2 border-yellow-400"
                  : ""
              } focus:border-b-2 focus:border-yellow-400`}
            >
              <HourglassBottomIcon
                style={{
                  color:
                    activeItem === "StarOutlineIcon" ? "yellow" : "inherit",
                }}
              />
              <span className="font-bold">Logistics</span>
            </span>
            <span
              onClick={() => handleClick("Recent")}
              className={`gap-1 flex cursor-pointer px-3 ${
                activeItem === "Recent" ? "border-b-2 border-yellow-400" : ""
              } focus:border-b-2 focus:border-yellow-400`}
            >
              <HourglassBottomIcon
                style={{
                  color: activeItem === "Recent" ? "yellow" : "inherit",
                }}
              />
              <span className="font-bold">Recent</span>
            </span>
            <ArrowForwardIos className="text-gray-400 text-sm" />
          </div>

          {/* Conditionally render ListRoutes or ListBuses based on the activeItem */}
          {activeItem === "Routes" && <ListRoutes />}
          {activeItem === "Buses" && <ListBuses />}
          {activeItem === "Minibuses" && <ListMinibuses />}
          {activeItem === "Vans" && <ListVans />}
          {activeItem === "Favourites" && <Logistics />}
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 p-0 flex-1 top-0 sticky">
        <Notice />
      </div>
    </div>
  );
}

export default Summ;
