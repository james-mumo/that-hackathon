import React, { useState, useEffect } from "react";
import { useRoutes, useBuses } from "../../utils/api";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";


function ListVans() {
  const { loading: busesLoading, error: busesError, buses } = useBuses();
  const { loading: routesLoading, error: routesError, routes } = useRoutes();

  if (busesLoading || routesLoading) {
    return <div>Loading...</div>;
  }

  if (busesError || routesError) {
    return <div>Error: {busesError || routesError}</div>;
  }

  return (
    <div className="bg-gray-900 p-2 px-4">
      <div className="flex flex-col">
        <span className="text-yellow-400 font-semibold pl-2">Vans</span>
      </div>
      <div className="gap-1 flex-col px-2 flex rounded-md">
        {buses
          .filter((bus) => (bus.capacity = 12)) // Only buses with capacity 50 or above
          .map((bus) => {
            const route = routes.find((route) => route.id === bus.id);
            const currentStage = route.stages.find(
              (stage) => stage.name === bus.currentLocation
            );
            const nextStage = currentStage
              ? route.stages.find((stage) => stage.name === currentStage.next)
              : null;

            const calculateFare = () => {
              let totalFare = 0;
              const currentStageIndex = route.stages.findIndex(
                (stage) => stage.name === bus.currentLocation
              );
              if (currentStageIndex !== -1) {
                for (let i = currentStageIndex; i < route.stages.length; i++) {
                  totalFare += route.stages[i].fare;
                }
              }
              return totalFare;
            };

            // Attach calculateFare function to bus object
            bus.calculateFare = calculateFare;

            return (
              <div
                key={bus.id}
                className="flex flex-col gap-0 rounded-md p-3  hover:bg-gray-600 border-b-4 border-b-yellow-400 hover:border-b-teal-500  transition-all duration-500 bg-gray-800 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-yellow-400 text-lg font-bold">
                      {bus.sacco}
                    </span>
                    <span className="font-semibold -mt-2 text-[14px]">
                      {bus.numberPlate}
                    </span>
                    <h2 className="text-yellow-400 text-sm flex-1">
                      BusNo {bus.busNo}
                    </h2>
                    <span>
                      <span className="font-semibold opacity-80">
                        {bus.capacity} Seater
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center align-middle">
                      <span className="font-semibold text-sm">
                        {route.name}
                      </span>
                      <span className="text-[11px] font-semibold">
                        (Ksh {bus.calculateFare()})
                      </span>
                    </div>
                    <span className="text-sm">
                      At:{" "}
                      <span className="font-semibold">
                        {bus.currentLocation}
                      </span>
                      ({bus.timeToCurrentLocation} mins away)
                    </span>

                    <span className="text-sm">
                      Next Stop:{" "}
                      <span className="font-semibold">
                        {nextStage ? nextStage.name : "-"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  {/* fourth */}
                  <div className="flex flex-col px-1 border w-full rounded-md border-yellow-500 py-3 my-2">
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
                </div>
                <div className="flex ml-2 justify-between">
                  <span>
                    {bus.capacity > 0 ? (
                      <span className="text-green-500 font-semibold">
                        Seats Available
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">Full</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        {buses.length === 0 && (
          <div className="px-3 flex flex-col gap-2 bg-gray-800">
            <span className="text-yellow-400 text-sm">No buses available</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListVans;
