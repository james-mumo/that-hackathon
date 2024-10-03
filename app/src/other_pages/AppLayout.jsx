import React from "react";
import LoggedInHeader from "./components/common/LoggedInHeader.jsx";
import LoggedHeader from "../pages/student/LoggedHeader.jsx";
import { ToastContainer, toast } from "react-toastify";

const AppLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col items-center w-full relative overflow-y-hidden">
      <LoggedHeader />
      <div className="flex w-full flex-col flex-1 p-0 bg-white z-10 overflow-y-hidden ">
        {children}
        <ToastContainer />
      </div>
      <div class="text-teal-900 w-1/2 invi align-middle absolute z-50 bottom-3">
        <LoggedInHeader />
      </div>
    </div>
  );
};

export default AppLayout;
