const initialState = {
  userData: localStorage.getItem("userData") || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
};

const tutorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_TUTOR":
      // Update the tutor data with the payload received during signup
      return { ...state, tutorData: action.payload };
    case "LOGIN_TUTOR":
      // You can update the login status and store login data here
      // For example, you might set isLoggedIn to true and store login data
      return {
        ...state,
        isLoggedIn: true,
        tutorData: action.payload, // Store login data if needed
      };
    default:
      return state;
  }
};

export default tutorReducer;
