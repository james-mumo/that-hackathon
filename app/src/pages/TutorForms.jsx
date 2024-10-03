import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import kenya from "../assets/kenyaa.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  login_student,
  login_tutor,
  signup_student,
  signup_tutor,
} from "../logic/api";
import { FormControl } from "@mui/base";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { loginTutor, signupTutor } from "../context/actions/tutorActions";
import { toast } from "react-toastify";

export default function TutorForms() {
  // const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    schoolOf: "",
    registrationNumber: "",
    typeOfEmployment: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    if (isLogin) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}${login_tutor}`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // Handle the login success response
        console.log("Login success", response.data?.userData);

        dispatch(loginTutor(response.data));
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data?.userData)
        );
        await new Promise((resolve) => setTimeout(resolve, 0));
        setIsLoading(false)
        toast.success("Login successful!");
        const userData = localStorage.getItem("userData");
        if (userData !== null) {
          navigate("/tutor/dashboard");
        }

        // You can also dispatch Redux actions here if needed
      } catch (error) {
        setIsLoading(false)
        toast.success({ error: error.response?.data?.message });
        console.error(error.response?.data?.message);
      }
    } else {
      try {
        console.log(process.env.REACT_APP_BACKEND_URL);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}${signup_tutor}`,
          {
            email: formData.email,
            password: formData.password,
            fullname: formData.fullname,
            phoneNumber: formData.phoneNumber,
            schoolOf: formData.schoolOf,
            registrationNumber: formData.registrationNumber,
            typeOfEmployment: formData.typeOfEmployment,
          }
        );

        dispatch(signupTutor(response.data?.userData));
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data?.userData)
        );
        await new Promise((resolve) => setTimeout(resolve, 0));

        setIsLoading(false)
        toast.success("Signup Successful");
        const userData = localStorage.getItem("userData");
        if (userData !== null) {
          navigate("/tutor/dashboard");
        }
      } catch (error) {
        setIsLoading(false)
        toast.success({ error: error.response?.data?.message });
        console.error(error.response?.data?.message);
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-row align-middle justify-center w-full">
      <div className="w-2/3 flex flex-col justify-center items-center">
        <img src={kenya} alt="" className="w-full " />
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
        className="w-1/3 flex flex-col justify-center items-center"
      >
        <form
          onSubmit={handleSubmit}
          className="border px-3 py-5 rounded-md text-white mx-10 bg-gray-900"
        >
          <h2 className="font-semibold">
            {isLogin ? "Login Form" : "Signup Form"}
          </h2>
          <TextField
            label="Email"
            name="email"
            style={{ color: "white" }}
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              sx: {
                color: "white",
              },
            }}
            inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
          />
          <TextField
            id="outlined-adornment-password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            label="Password"
            name="password"
            fullWidth
            style={{ color: "white" }}
            inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
            InputLabelProps={{
              sx: {
                color: "white",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <TextField
                label="Full Name"
                name="fullname"
                style={{ color: "white" }}
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                style={{ color: "white" }}
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
              />
              <TextField
                label="Registration Number"
                name="registrationNumber"
                style={{ color: "white" }}
                type="text"
                value={formData.registrationNumber}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
              />

              <FormControl>
                <InputLabel
                  id="type-of-employment-label"
                  className="text-white"
                  style={{ color: "white" }}
                >
                  School Of:
                </InputLabel>
                <Select
                  labelId="school-of-label"
                  id="school-of"
                  name="schoolOf"
                  value={formData.schoolOf}
                  onChange={handleChange}
                  variant="outlined"
                  style={{ color: "white" }}
                  fullWidth
                  required
                  label="School of"
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                >
                  <MenuItem value="computing">Computing & Informatics</MenuItem>
                  <MenuItem value="business-economis">Business & Economics</MenuItem>
                  <MenuItem value="social-sciences">School of Social Sciences</MenuItem>
                  <MenuItem value="health-sciences">School of Health Sciences</MenuItem>
                  <MenuItem value="education">School of Education</MenuItem>
                </Select>
              </FormControl>


              <FormControl>
                <InputLabel
                  id="type-of-employment-label"
                  className="text-white"
                  style={{ color: "white" }}
                >
                  Type of Employment
                </InputLabel>
                <Select
                  labelId="type-of-employment-label"
                  id="type-of-employment"
                  name="typeOfEmployment"
                  value={formData.typeOfEmployment}
                  onChange={handleChange}
                  variant="outlined"
                  style={{ color: "white" }}
                  fullWidth
                  required
                  label="Type of Employment"
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                >
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          <div className="flex flex-col gap-2 my-2">
            <Button variant="contained" type="submit">
              {isLogin ? "Login" : "Signup"}
            </Button>{" "}
            <span
              onClick={toggleForm}
              className="text-sm w-full hover:underline cursor-pointer"
            >
              {isLogin
                ? "Not a user? Create an account"
                : "Already a user? Log In"}
            </span>
          </div>
        </form>
      </Box>
    </div>
  );
}
