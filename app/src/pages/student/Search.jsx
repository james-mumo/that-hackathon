import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRoutes, useBuses } from "../../other_pages/utils/api";
import { RadioButtonUnchecked } from "@mui/icons-material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import Notice from "../../other_pages/screens/Notice";
import LoggedHeader from "./LoggedHeader";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  const { loading: busesLoading, error: busesError, buses } = useBuses();
  const { loading: routesLoading, error: routesError, routes } = useRoutes();

  // Filter routes based on search query
  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (busesLoading || routesLoading) {
    return <div className="bg-gray-800 flex w-full">Loading...</div>;
  }

  if (busesError || routesError) {
    return (
      <div className="bg-gray-800 flex w-full">
        Error: {busesError || routesError}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 flex w-full overflow-y-scroll px-5 h-screen">
      <div class="flex w-2/3 flex-col p-3">
        <LoggedHeader />
        <div className="flex flex-col">
          <span className="text-yellow-400 ml-3 font-semibold">Routes</span>
        </div>
        <div
          className="gap-2 flex-col bg-inherit px-1 pt-1 flex"
          style={{ minHeight: "80vh", overflowY: "scroll" }}
        >
          {filteredRoutes.map((route) => {
            const totalFare = route.stages.reduce(
              (total, stage) => total + stage.fare,
              0
            );

            // Filter buses for this route
            const filteredBuses = buses.filter((bus) => bus.id === route.id);
            // console.log(filteredBuses);

            return (
              <div
                key={route.id}
                className="flex flex-col gap-0 rounded-md p-3 hover:bg-gray-700 transition-all duration-500 bg-gray-800  border-b-4 border-b-yellow-400 hover:border-b-teal-500  cursor-pointer"
              >
                <div className="flex">
                  <h2 className="text-yellow-400 font-bold text-lg flex-1">
                    {route.name}
                  </h2>
                  <h2 className="text-yellow-400 text-sm">Ksh. {totalFare}</h2>
                </div>
                <span className="text-sm mt-2 font-semibold opacity-90">
                  Vehicles on this route:
                </span>
                <div className="gap-2 flex flex-col border border-yellow-300 px-2 rounded-sm border-opacity-35">
                  {filteredBuses.length > 0 ? (
                    filteredBuses.map((bus) => (
                      <div key={bus.id} className="flex flex-col">
                        <span className="flex  py-3">
                          <span className="flex flex-col flex-1">
                            <div className="text-sm text-gray-300">
                              {bus.sacco} {bus.busNo}
                            </div>
                            <span className="text-sm font-semibold text-yellow-300 opacity-80">
                              {bus.numberPlate}
                            </span>
                            <span className="ml-0 text-sm text-emerald-400 font-semibold">
                              {bus.capacity} Seater
                            </span>
                            {/* fourth */}
                            <div className="flex flex-col px-1 mt-2">
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
                          </span>

                          <span className="flex flex-col text-sm">
                            <span className="flex items-center align-middle gap-1">
                              <span className="text-sm font-semibold">At</span>
                              {bus.currentLocation} {">"} {bus.to}
                            </span>

                            <span>
                              {bus.distanceToCurrentLocation} km (
                              {bus.timeToCurrentLocation} mins away),
                            </span>
                          </span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-red-300 text-sm">
                      No vehicles available!
                    </span>
                  )}
                </div>
                {/*  */}
                {/*  */}

                <div className="flex px-0 mb-4 mt-2">
                  <span className="text-sm font-semibold">Via: </span>
                  <div className="flex w-full overflow-scroll">
                    <div className="flex w-full flex-wrap">
                      {route.stages.map((stage) => (
                        <span
                          className="flex px-2 text-sm opacity-85 items-center gap-1"
                          key={stage.name}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <RadioButtonUnchecked style={{ fontSize: 8 }} />{" "}
                          {stage.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col w-full gap-2 p-0 flex-1 ">
        <Notice />
      </div>
    </div>
  );
}

export default Search;
