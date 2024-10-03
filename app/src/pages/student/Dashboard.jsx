import React from "react";
import kenya from "../../assets/kenyaa.png";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full p-2 bg">
      <span className="flex items-center mb-2">
        <hr className="border-t border-slate-400 mx-1 w-4" />
        <span className="text-primary text-1xl italic md:text-xl font-semibold">
          DashBoard
        </span>
        <hr className="border-t border-slate-400 mx-1 flex-grow" />
      </span>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 h-fit rounded-lg shadow-md p-4 flex items-center justify-between flex-col">
          <div className="w-full">
            <span className="text-white text-sm flex flex-row items-center gap-2">
              Profile also attendace here
            </span>
            <div className="profile flex flex-row justify-start items-center gap-5 p-2">
              <img
                src={kenya}
                alt=""
                className="w-28 h-28 border rounded-full"
              />
              <div className="stats">
                <div className="flex flex-row items-center gap-2 bg-black bg-opacity-30 p-2 rounded-md mb-1">
                  <label className="text-white text-sm opacity-75 font-semibold">
                    Name:
                  </label>
                  <h3 className="text-white text-lg font-semibold">
                    James A. Mumo
                  </h3>
                </div>
                <div className="flex flex-row items-center gap-2 bg-black bg-opacity-30 p-2 rounded-md mb-1">
                  <label className="text-white text-sm opacity-75 font-semibold">
                    Year:
                  </label>
                  <h5 className="text-white text-md font-semibold">
                    2<sup>nd</sup> Yr 2<sup>nd</sup> Sem
                  </h5>
                </div>
                <div className="flex flex-row items-center gap-2 bg-black bg-opacity-30 p-2 rounded-md mb-1">
                  <label className="text-white text-sm opacity-75 font-semibold">
                    Program:
                  </label>
                  <h5 className="text-white text-sm font-semibold">
                    BSc. Computer Science
                  </h5>
                </div>
                <div className="flex flex-row items-center gap-2 bg-black bg-opacity-30 p-2 rounded-md mb-1">
                  <label className="text-white text-sm opacity-75 font-semibold">
                    ID:
                  </label>
                  <h3 className="text-white text-md font-semibold">
                    ICT-G-4-099-19
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-green-500 h-24 rounded-lg shadow-md">
          Notice Board on Class
        </div>
        <div className="bg-red-500 h-24 rounded-lg shadow-md">
          Marks Summary
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
