import React, { useState } from "react";
import Quote from "../components/Quote";
import { Link } from "react-router-dom";
import Input from "../components/Input";

interface SignInInputTypes {
  email: string;
  password: string;
}
function SignIn() {
  const [userDetails, setUserDetails] = useState<SignInInputTypes>({
    email: "",
    password: "",
  });
  return (
    <div className="min-h-screen flex">
      <div className="flex w-1/2 items-center justify-center bg-white">
        <div className="p-8 bg-white rounded-lg shadow-lg w-[65%]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h2>
          <p className="text-gray-600 mb-6">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
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
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Signup
          </button>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-slate-200">
        <Quote />
      </div>
    </div>
  );
}

export default SignIn;
