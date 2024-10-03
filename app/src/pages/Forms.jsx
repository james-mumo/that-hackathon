import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import kenya from "../assets/kenyaa.png";
import axios from "axios";
import { login_student, signup_student } from "../logic/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl } from "@mui/base";
import { InputLabel, MenuItem, Select } from "@mui/material";


export default function LoginSignupForm() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    courseName: "",
    registrationNumber: "",
    year: "",
    session: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    if (isLogin) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}${login_student}`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        toast.success("Login successful!");

        // Handle the login success response
        console.log("Login success", response.data);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data?.userData)
        );
        await new Promise((resolve) => setTimeout(resolve, 0)); // This is a small delay, you can remove it if unnecessary
        setIsLoading(false);
        const userData = localStorage.getItem("userData");
        if (userData !== null) {
          navigate("/student");
        }

        // You can also dispatch Redux actions here if needed
      } catch (error) {
        setIsLoading(false)
        toast.success({ error: error.response?.data?.message });
        console.error(error.response?.data?.message);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}${signup_student}`,
          {
            email: formData.email,
            password: formData.password,
            fullname: formData.fullname,
            phoneNumber: formData.phoneNumber,
            courseName: formData.courseName,
            registrationNumber: formData.registrationNumber,
            year: formData.year,
            session: formData.session,
          }
        );

        // Handle the signup success response
        console.log("Signup success", response.data);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data?.userData)
        );
        await new Promise((resolve) => setTimeout(resolve, 0));
        setIsLoading(false);

        toast.success("Signup successful!");

        const userData = localStorage.getItem("userData");
        if (userData !== null) {
          navigate("/student");
        }

        // You can also dispatch Redux actions here if needed
      } catch (error) {
        setIsLoading(false);
        console.error(error);
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
          className="border relative px-3 py-5 rounded-md text-white mx-10 bg-gray-900"
        >

          {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}

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
                  id="courseName"
                  className="text-white"
                  style={{ color: "white" }}
                >
                  Select Course Name
                </InputLabel>
                <Select
                  labelId="courseName"
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  variant="outlined"
                  style={{ color: "white" }}
                  fullWidth
                  required
                  label="Course Name"
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                >
                  <MenuItem value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</MenuItem>
                  <MenuItem value="Bachelor of Arts in Community Development">Bachelor of Arts in Community Development</MenuItem>
                  <MenuItem value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</MenuItem>
                  <MenuItem value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</MenuItem>
                  <MenuItem value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</MenuItem>
                  <MenuItem value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</MenuItem>
                  <MenuItem value="Bachelor of Science in Public Health">Bachelor of Science in Public Health</MenuItem>
                  <MenuItem value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</MenuItem>
                  <MenuItem value="Bachelor of Public Health">Bachelor of Public Health</MenuItem>
                  <MenuItem value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</MenuItem>
                  <MenuItem value="Bachelor of Arts in Community Development">Bachelor of Arts in Community Development</MenuItem>
                  <MenuItem value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</MenuItem>
                  <MenuItem value="Bachelor of Arts in Development Studies">Bachelor of Arts in Development Studies</MenuItem>
                  <MenuItem value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</MenuItem>
                  <MenuItem value="Bachelor of Arts in International Relations">Bachelor of Arts in International Relations</MenuItem>
                  <MenuItem value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</MenuItem>
                  <MenuItem value="Bachelor of Arts in Mass Media and Communication">Bachelor of Arts in Mass Media and Communication</MenuItem>
                  <MenuItem value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</MenuItem>
                  <MenuItem value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</MenuItem>
                  <MenuItem value="Bachelor of Arts in Public Administration and Governance">Bachelor of Arts in Public Administration and Governance</MenuItem>
                  <MenuItem value="Bachelor of Arts in Sociology">Bachelor of Arts in Sociology</MenuItem>
                  <MenuItem value="Bachelor of Arts in Sociology and Development">Bachelor of Arts in Sociology and Development</MenuItem>
                  <MenuItem value="Bachelor of Biomedical Laboratory Science">Bachelor of Biomedical Laboratory Science</MenuItem>
                  <MenuItem value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</MenuItem>
                  <MenuItem value="Bachelor of Business Information Technology">Bachelor of Business Information Technology</MenuItem>
                  <MenuItem value="Bachelor of Business Management">Bachelor of Business Management</MenuItem>
                  <MenuItem value="Bachelor of Commerce">Bachelor of Commerce</MenuItem>
                  <MenuItem value="Bachelor of Counselling">Bachelor of Counselling</MenuItem>
                  <MenuItem value="Bachelor of Economics">Bachelor of Economics</MenuItem>
                  <MenuItem value="Bachelor of Economics and Finance">Bachelor of Economics and Finance</MenuItem>
                  <MenuItem value="Bachelor of Economics and Statistics">Bachelor of Economics and Statistics</MenuItem>
                  <MenuItem value="Bachelor of Education in Early Childhood Studies">Bachelor of Education in Early Childhood Studies</MenuItem>
                  <MenuItem value="Bachelor of Education in Special Needs Education (Primary MenuItem)">Bachelor of Education in Special Needs Education (Primary Option)</MenuItem>
                  <MenuItem value="Bachelor of Education (Arts)">Bachelor of Education (Arts)</MenuItem>
                  <MenuItem value="Bachelor of Education (Primary Education)">Bachelor of Education (Primary Education)</MenuItem>
                  <MenuItem value="Bachelor of Education (Primary MenuItem)">Bachelor of Education (Primary MenuItem)</MenuItem>
                  <MenuItem value="Bachelor of Education (Science)">Bachelor of Education (Science)</MenuItem>
                  <MenuItem value="Bachelor of Education in Special Needs Education (Secondary MenuItem)">Bachelor of Education in Special Needs Education (Secondary Option)</MenuItem>
                  <MenuItem value="Bachelor of Laws">Bachelor of Laws</MenuItem>
                  <MenuItem value="Bachelor of Management and Office Administration">Bachelor of Management and Office Administration</MenuItem>
                  <MenuItem value="Bachelor of Medicine and Surgery">Bachelor of Medicine and Surgery</MenuItem>
                  <MenuItem value="Bachelor of Pharmacy">Bachelor of Pharmacy</MenuItem>
                  <MenuItem value="Bachelor of Procurement">Bachelor of Procurement</MenuItem>
                  <MenuItem value="Bachelor of Public Health">Bachelor of Public Health</MenuItem>
                  <MenuItem value="Bachelor of Science in Actuarial Science">Bachelor of Science in Actuarial Science</MenuItem>
                  <MenuItem value="Bachelor of Arts in International Relations">Bachelor of Arts in International Relations</MenuItem>
                  <MenuItem value="Bachelor of Arts in Public Administration and Governance">Bachelor of Arts in Public Administration and Governance</MenuItem>
                  <MenuItem value="Bachelor of Arts in Mass Media and Communication">Bachelor of Arts in Mass Media and Communication</MenuItem>
                  <MenuItem value="Bachelor of Arts in Sociology">Bachelor of Arts in Sociology</MenuItem>
                </Select>
              </FormControl>

              <div className="flex gap-2">
                <TextField
                  label="Year"
                  name="year"
                  style={{ color: "white" }}
                  type="text"
                  value={formData.year}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                />
                <TextField
                  label="Session"
                  name="session"
                  style={{ color: "white" }}
                  type="text"
                  value={formData.session}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  inputProps={{
                    style: { fontFamily: "Arial", color: "white" },
                  }}
                />
              </div>
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
            <Link
              to="/auth/tut"
              className="text-sm w-full hover:underline cursor-pointer"
            >
              Tutor?
            </Link>
          </div>
        </form>
      </Box>
    </div>
  );
}
