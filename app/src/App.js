import React from "react";

// import { UserProvider } from "./context/user/userContext";
import Routes from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./context/store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        <Routes />
        {/* <UserProvider>
        {/* //     */}
        {/* </UserProvider> */}
      </Provider>
    </div>
  );
};

export default App;
