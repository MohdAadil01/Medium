import React, { useState } from "react";
import axios from "axios";
import Quote from "../components/Quote";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

interface SignupInputTypes {
  username: string;
  email: string;
  password: string;
}
function SignUp() {
  const [userDetails, setUserDetails] = useState<SignupInputTypes>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, userDetails);
      const token = response.data;
      localStorage.setItem("token", token);
      console.log(token);
      navigate("/blogs");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || error.message);
        setErrorMessage(error.response?.data.message);
      } else {
        console.log("Unexpected error:", error);
        setErrorMessage("An Unexpected Error occured.");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex w-1/2 items-center justify-center bg-white">
        <div className="p-8 bg-white rounded-lg shadow-lg w-[65%]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-6">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
          <Input
            type="text"
            placeholder="Enter your name"
            label="Username"
            onChange={(e) => {
              setUserDetails((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
          <Input
            type="email"
            placeholder="Email"
            label="Email"
            onChange={(e) => {
              setUserDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            onChange={(e) => {
              setUserDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
          <button
            onClick={sendRequest}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
          <p>{errorMessage}</p>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-slate-200">
        <Quote />
      </div>
    </div>
  );
}

export default SignUp;
