import React, { useState } from "react";
import Modal from "../../other_pages/screens/Modal";
import Notice from "../../other_pages/screens/Notice";

import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Collapsible from "react-collapsible";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import RouteIcon from "@mui/icons-material/Route";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import {
  SettingsInputAntenna,
  AutoAwesome,
  Badge,
  Deck,
} from "@mui/icons-material";
import { useBuses, useRoutes } from "../../other_pages/utils/api";

function Dash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const handleBusItemClick = (bus) => {
    setSelectedBus(bus);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapsible = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const [activeItem, setActiveItem] = useState("NearBy");

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const { loading: busesLoading, error: busesError, buses } = useBuses();
  const { loading: routesLoading, error: routesError, routes } = useRoutes();

  if (busesLoading || routesLoading) {
    return <div className="bg-gray-800 w-full">Loading...</div>;
  }

  if (busesError || routesError) {
    return <div>Error: {busesError || routesError}</div>;
  }

  return (
    <div className="flex flex-col overflow-y-scroll bg-gray-900 w-full gap-1">
      <div class="flex items-center px-4 gap-3 mb-2">
        <div class="flex gap-2 border border-dotted border-teal-400 rounded-md p-1 pr-2">
          <GpsFixedIcon style={{ color: "red" }} />

          <span className="font-semibold">Thika</span>
        </div>
        <div className="flex flex-row h-[30px] items-center justify-evenly gap-2 overflow-x-auto mt-1">
          <span className="font-bold mr-3 text-sm">
            Range <span>(km)</span>:
          </span>
          <div className="flex flex-1 gap-3 items-end">
            <span className="flex bg-slate-500 px-3 rounded-md items-center align-middle text-[13px] cursor-pointer">
              100
            </span>
            <span className="flex bg-slate-500 px-3 rounded-md items-center align-middle text-[13px] cursor-pointer">
              200
            </span>
            <span className="flex bg-slate-500 px-3 rounded-md items-center align-middle text-[13px] cursor-pointer">
              400
            </span>
            <span className="flex bg-slate-500 px-3 rounded-md items-center align-middle text-[13px] cursor-pointer">
              800
            </span>
            <span className="flex bg-slate-500 px-3 rounded-md items-center align-middle text-[13px] cursor-pointer">
              CUSTOM
            </span>
          </div>
        </div>
        <div className="flex flex-row h-[30px] justify-evenly items-center gap-2 overflow-x-auto mt-1">
          <ArrowBackIosNew className="text-gray-400 text-sm" />
          <span
            onClick={() => handleClick("NearBy")}
            className={`gap-1 flex cursor-pointer items-center px-2 ${
              activeItem === "NearBy" ? "border-b-2 border-yellow-400" : ""
            } focus:border-b-2 focus:border-yellow-400`}
          >
            <SettingsInputAntenna className="text-yellow-400" />
            <span className="font-bold text-sm">NearBy</span>
          </span>
          <span
            onClick={() => handleClick("Starred")}
            className={`gap-1 flex cursor-pointer items-center px-2 ${
              activeItem === "Starred" ? "border-b-2 border-yellow-400" : ""
            } focus:border-b-2 focus:border-yellow-400`}
          >
            <AutoAwesome className="text-yellow-400" />
            <span className="font-bold text-sm">Starred</span>
          </span>
          <span
            onClick={() => handleClick("Work")}
            className={`gap-1 flex cursor-pointer items-center px-2 ${
              activeItem === "Work" ? "border-b-2 border-yellow-400" : ""
            } focus:border-b-2 focus:border-yellow-400`}
          >
            <Badge className="text-yellow-400" />
            <span className="font-bold text-sm">Work</span>
          </span>
          <span
            onClick={() => handleClick("Home")}
            className={`gap-1 flex cursor-pointer items-center px-2 ${
              activeItem === "Home" ? "border-b-2 border-yellow-400" : ""
            } focus:border-b-2 focus:border-yellow-400`}
          >
            <Deck className="text-yellow-400" />
            <span className="font-bold text-sm">Home</span>
          </span>
          <span
            onClick={() => handleClick("Collection")}
            className={`gap-1 flex cursor-pointer items-center px-2 ${
              activeItem === "Collection" ? "border-b-2 border-yellow-400" : ""
            } focus:border-b-2 focus:border-yellow-400`}
          >
            <Deck className="text-yellow-400" />
            <span className="font-bold text-sm">Collection</span>
          </span>
          <ArrowForwardIos className="text-gray-400 text-sm" />
        </div>
      </div>

      {/* Render buses */}
      <div className="h-screen w-full bg-gray-800 flex">
        <div class="flex w-2/3 flex-col p-3">
          <span className="px-3 font-semibold text-yellow-400 ">Vehicles</span>
          <ul className="bg-gray-800 w-full overflow-y-scroll flex flex-col gap-2 flex-1 px-3">
            {buses.map((bus) => {
              console.log(bus);
              // console.log(routes);
              const calculateFare = () => {
                let totalFare = 0;
                const route = routes.find((route) => route.id === bus.id);
                if (!route) {
                  throw new Error(`Route with ID ${bus.id} not found.`);
                }
                const currentStageIndex = route.stages.findIndex(
                  (stage) => stage.name === bus.currentLocation
                );
                if (currentStageIndex !== -1) {
                  for (
                    let i = currentStageIndex;
                    i < route.stages.length;
                    i++
                  ) {
                    totalFare += route.stages[i].fare;
                  }
                }
                return totalFare;
              };

              const getRouteDetails = () => {
                const route = routes.find((route) => route.id === bus.id);
                if (!route) {
                  throw new Error(`Route with ID ${bus.id} not found.`);
                }

                // Create a Set to hold unique values for 'name' and 'next'
                const uniqueValues = new Set();

                // Iterate through the stages and add both 'name' and 'next' values to the Set
                route.stages.forEach((stage) => {
                  uniqueValues.add(stage.name);
                  uniqueValues.add(stage.next);
                });

                // Convert the Set back to an array to return
                const uniqueArray = [...uniqueValues];

                return {
                  routeName: route.name,
                  uniqueStops: uniqueArray,
                };
              };

              return (
                <li
                  key={bus.id}
                  className="rounded-md flex gap-2 w-full py-4 hover:bg-gray-600 border-b-4 border-b-yellow-400 hover:border-b-teal-500 transition-all duration-500 cursor-pointer bg-gray-700"
                  onClick={() => handleBusItemClick(bus)}
                >
                  <span className="text-yellow-400 flex-col min-w-40 p-2 font-bold items-center flex align-middle text-lg">
                    {bus.busNo}
                    <span className="text-sm"> {bus.numberPlate}</span>
                    <span className="text-[10px] -mt-2"> {bus.sacco} </span>
                    <span className="text-[10px] -mt-3 text-gray-300">
                      {bus.capacity} seater
                    </span>
                  </span>
                  <div className="flex flex-col w-full">
                    <div className="flex px-3 w-full ">
                      <span className="flex flex-1 gap-2 text-sm items-center align-middle">
                        {/* To:
                        <span className="font-bold text-md"> {bus.to}</span> */}
                        <span className="font-bold text-lg">
                          <RouteIcon /> {getRouteDetails().routeName}
                        </span>
                        <span className="text-[12px]">
                          (Ksh.{calculateFare()})
                        </span>
                      </span>
                      <span className="text-sm gap-1 flex">
                        <span className="text-yellow-400 font-bold gap-2">
                          {bus.timeToStage} - {bus.timeToStage + 12} mins
                        </span>
                      </span>
                    </div>
                    {/* second */}
                    <div className="flex px-3">
                      <span className="flex flex-1 gap-1 text-sm items-center align-bottom">
                        <ShareLocationIcon />
                        At:
                        <span className="font-bold text-md">
                          {bus.currentLocation}
                        </span>
                        <span className="text-sm gap-2 flex">
                          {bus.timeToCurrentLocation} mins away
                        </span>
                      </span>
                    </div>
                    {/* third */}
                    <div className="flex px-3">
                      <span className="flex flex-1 gap-1 text-sm items-center align-bottom">
                        <EventSeatIcon />
                        <span className="font-bold text-md">Seats: </span>
                        <span className="text-sm gap-2 flex">
                          {bus.capacity} Left
                        </span>
                      </span>
                    </div>
                    {/* fourth */}
                    <div className="flex flex-col px-3 mt-2">
                      <span className="text-[13px] text-yellow-300">
                        Accessibility
                      </span>
                      <div class="flex gap-3">
                        <div class="flex flex-col">
                          <span className="text-sm">
                            <AccessibleIcon />
                            Wheelchair:{" "}
                            <span className="text-teal-500 font-semibold">
                              {bus.wheelchairAccessible
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </span>
                          <span className="text-sm">
                            <AddRoadIcon />
                            Ramp Availability:{" "}
                            <span className="text-teal-500 font-semibold">
                              {bus.rampAvailability
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </span>
                        </div>
                        <div class="flex flex-col">
                          <span className="text-sm">
                            <PregnantWomanIcon />
                            Reserved Seats:{" "}
                            <span className="text-teal-500 font-semibold">
                              {bus.reservedSeats}
                            </span>
                          </span>
                          <span className="text-sm">
                            <AssistWalkerIcon />
                            Step-Free Access:{" "}
                            <span className="text-teal-500 font-semibold">
                              {bus.stepFreeAccess ? "Yes" : "No"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* bottom */}
                    <div className="flex flex-col px-3 w-full mt-2">
                      <span className="text-[13px] text-yellow-300">Via</span>
                      <div className="flex gap-2 h-6 overflow-x-scroll whitespace-nowrap">
                        {getRouteDetails().uniqueStops.map((stop, index) => (
                          <span
                            key={index}
                            className="text-[13px] text-white inline"
                          >
                            {stop}
                            {index < getRouteDetails().uniqueStops.length - 1 &&
                              ","}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/*  */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col w-full gap-2 p-0 flex-1 ">
          <Notice />
        </div>
      </div>

      {/* Render Modal */}
      {selectedBus && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBus(null)}
          bus={selectedBus}
        />
      )}
    </div>
  );
}

export default Dash;
