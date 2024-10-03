export const SIGNUP_TUTOR = "SIGNUP_TUTOR";
export const LOGIN_TUTOR = "LOGIN_TUTOR";

export const signupTutor = (tutorData) => {
  return {
    type: SIGNUP_TUTOR,
    payload: tutorData,
  };
};

export const loginTutor = (credentials) => {
  return {
    type: LOGIN_TUTOR,
    payload: credentials,
  };
};

export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
