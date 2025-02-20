import React, { useState } from "react";
import { backend_uri, useBuses, useRoutes } from "../../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

function BusLocation() {
  const { loading, error, buses } = useBuses(); // Get buses data using the hook
  const { loading: routesLoading, error: routesError, routes } = useRoutes();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [remainingSeats, setRemainingSeats] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setFilteredBuses([]);
    setRemainingSeats(bus.capacity); // Initialize remaining seats with the current capacity
    setSelectedLocation(bus.currentLocation); // Initialize selected location with the current location
  };

  const handleClearSelection = () => {
    setSelectedBus(null);
    setSearchTerm("");
  };

  const handleLocationUpdate = async () => {
    try {
      if (selectedBus && remainingSeats !== null && selectedLocation) {
        const response = await axios.post(`${backend_uri}buses/update`, {
          busId: selectedBus._id,
          remainingSeats: remainingSeats,
          currentLocation: selectedLocation,
        });

        console.log("Updated Bus:", response.data);
        toast.success("Bus details updated successfully!");
        // handleClearSelection(); // Clear selection after successful update
      }
    } catch (error) {
      console.error("Error updating bus details:", error);
      // Handle error appropriately
    }
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterBuses(searchTerm);
  };

  const filterBuses = (term) => {
    const filtered = buses.filter(
      (bus) =>
        bus.busNo.toLowerCase().includes(term) ||
        bus.numberPlate.toLowerCase().includes(term)
    );
    setFilteredBuses(filtered);
  };

  const busesToDisplay = searchTerm ? filteredBuses : buses;

  return (
    <div className="flex flex-col h-[80vh] border-teal-400 rounded-sm bg-gray-900 overflow-x-hidden border overflow-scroll w-1/4">
      {!selectedBus && (
        <>
          <span className="text-md font-semibold mb-2 top-0 p-3 sticky bg-gray-900">
            Update Bus Location
          </span>
          <input
            type="text"
            placeholder="Search buses..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 mb-2 mx-2 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
          />
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!selectedBus &&
        busesToDisplay.map((bus) => {
          const route = routes.find((route) => route.id === bus.id);

          return (
            <div
              key={bus._id}
              className="hover:bg-slate-600 border-b-2 border-gray-300 mx-3 py-4 bg-slate-700 rounded-sm px-2 mb-2"
            >
              <div className="flex align-middle">
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-emerald-300 font-semibold flex">
                    {bus.busNo}, {bus.numberPlate}
                  </span>
                  <span className="text-teal-300 text-sm font-semibold">
                    Sacco: {bus.sacco}
                  </span>
                </div>
                <div className="flex text-sm  flex-col font-semibold">
                  {route ? (
                    <p className="text-emerald-400">To: {route.name}</p>
                  ) : (
                    <p className="text-emerald-400">Route: N/A</p>
                  )}
                </div>
              </div>

              <p className="text-teal-100 text-sm">Capacity: {bus.capacity}</p>
              <span className="text-teal-100 text-sm font-semibold">
                Current Location: {bus.currentLocation}
              </span>

              <button
                onClick={() => handleBusSelect(bus)}
                className="mt-4 px-4 py-0 rounded-sm w-full outline-none focus:normal-nums bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
              >
                Select Bus
              </button>
            </div>
          );
        })}

      {selectedBus && (
        <div className="border-t border-gray-300 pt-4 p-3 h-fit">
          <div className="flex align-middle bg-slate-600 p-3 rounded-sm">
            <div className="flex flex-col flex-1">
              <span className="text-sm text-emerald-300 font-semibold flex">
                {selectedBus.busNo}, {selectedBus.numberPlate}
              </span>
              <span className="text-teal-300 text-sm font-semibold">
                Sacco: {selectedBus.sacco}
              </span>
              {/* <div className="flex text-sm flex-col font-semibold"></div> */}
            </div>
            <div className="flex text-sm  flex-col font-semibold">
              {routes.map((route) => {
                if (route.id === selectedBus.id) {
                  const routeName = route.name; // Assuming the route name property is called 'name'
                  return (
                    <div key={route.id}>
                      <span className="text-sm text-emerald-300 font-semibold flex">
                        {routeName}
                      </span>
                    </div>
                  );
                }
                return null;
              })}

              <p className="text-emerald-400">To: {selectedBus.to}</p>
            </div>
          </div>

          <div class="flex  bg-slate-600 flex-col mt-1 rounded-sm p-2">
            <p className="text-teal-100">Capacity: {selectedBus.capacity}</p>
            <span className="text-teal-100 text-sm font-semibold">
              Current Location: {selectedBus.currentLocation}
            </span>
          </div>

          <div className="mt-4">
            <label
              htmlFor="remainingSeats"
              className="block text-sm font-semibold"
            >
              Remaining Seats:
            </label>
            <input
              type="number"
              id="remainingSeats"
              value={remainingSeats}
              onChange={(e) => setRemainingSeats(e.target.value)}
              className="p-2 mt-1 mb-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="currentLocation"
              className="block text-sm font-semibold"
            >
              Current Location:
            </label>
            <select
              id="currentLocation"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-2 mt-1 mb-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Location</option>
              {/* Map through the routes and find the one matching the selected bus */}
              {routes.map((route) => {
                if (route.id === selectedBus.id) {
                  return (
                    // Map through the stages of the selected route and render each as an option
                    route.stages.map((stage) => (
                      <option key={stage._id} value={stage.name}>
                        {stage.name}
                      </option>
                    ))
                  );
                }
                return null;
              })}
            </select>
          </div>
          <div class="flex gap-1 items-center justify-evenly">
            <button
              onClick={handleLocationUpdate}
              className="px-4 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600 mt-4"
            >
              Update Location
            </button>
            <button
              onClick={handleClearSelection}
              className="px-4 py-2 rounded-md font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 mt-4"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusLocation;
