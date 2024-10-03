import React from "react";

import { FaCloudSun } from "react-icons/fa";
import { WiDayCloudyWindy } from "react-icons/wi";
import { FiCloudRain } from "react-icons/fi";
import { GiHeavyRain } from "react-icons/gi";
import { BiSolidTrafficBarrier } from "react-icons/bi";
import { GiTortoise } from "react-icons/gi";

function Notifications({ notifications, nloading, nerror }) {
  return (
    <div className="">
      {nloading && <p>Loading notifications...</p>}
      {nerror && <p>Error: {nerror}</p>}
      {!nloading && !nerror && notifications.length === 0 && (
        <p>No notifications available.</p>
      )}
      {!nloading && !nerror && notifications.length > 0 && (
        <div className="flex flex-col gap-2">
          {notifications.map((notification) => (
            <div
              className="flex gap-1 p-1 border rounded-sm border-opacity-50 bg-yellow-400 border-yellow-800"
              key={notification._id}
            >
              <div className="flex flex-col justify-center items-center align-middle rounded-sm border-teal-500">
                <span className="flex items-center justify-center w-32">
                  {notification.selectedWeather === "Sunny" && (
                    <FaCloudSun className="text-5xl text-gray-800" />
                  )}
                  {notification.selectedWeather === "Windy" && (
                    <WiDayCloudyWindy className="text-5xl text-gray-800" />
                  )}
                  {notification.selectedWeather === "Rainy" && (
                    <FiCloudRain className="text-5xl text-gray-800" />
                  )}
                  {notification.selectedWeather === "Heavy Rain" && (
                    <GiHeavyRain className="text-5xl text-gray-800" />
                  )}
                  {notification.selectedWeather === "Heavy Traffic" && (
                    <BiSolidTrafficBarrier className="text-5xl text-gray-800" />
                  )}
                  {notification.selectedWeather === "Snarl Up" && (
                    <GiTortoise className="text-5xl text-gray-800" />
                  )}
                </span>

                <span className="text-sm font-semibold text-gray-700 gap-1">
                  {notification.selectedWeather}
                </span>
              </div>

              <div className="flex flex-col flex-1 border-l px-1 border-teal-600">
                <span className="flex font-semibold text-gray-900 gap-2 text-md justify-start items-center align-middle">
                  {notification?.selectedRoute?.name}
                </span>
                <div className="flex font-semibold text-gray-950 gap-2 justify-start items-center align-middle">
                  {/*  */}
                </div>
                <p className="text-sm opacity-85 text-gray-900 font-semibold">
                  {notification.notification}
                </p>
                <span
                  className="mt-2 text-sm text-gray-900 font-semibold opacity-75"
                  value=""
                >
                  Affected Stages
                </span>
                <div className="flex gap-1">
                  {notification.selectedStages.map((stage, index) => (
                    <span
                      className="opacity-70 text-sm text-gray-800"
                      key={index}
                    >
                      {stage}
                      {index < notification.selectedStages.length - 1 &&
                        ","}{" "}
                      {/* Add a comma unless it's the last item */}
                    </span>
                  ))}
                </div>

                <span className="text-[12px] flex-1 flex text-center justify-end text-blue-800 font-semibold gap-1">
                  {notification.time}

                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
