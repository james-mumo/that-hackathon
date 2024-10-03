// store.js
import { legacy_createStore } from "redux";
import tutorReducer from "./reducers/tutorReducer";

const store = legacy_createStore(tutorReducer);

export default store;
