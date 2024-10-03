const isAuthenticated = () => {
  // Check if userType is present in localStorage
  return localStorage.getItem("userType") !== null;
};

export { isAuthenticated };
