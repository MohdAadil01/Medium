import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

interface SignupInputTypes {
  username: string;
  email: string;
  password: string;
}

function Auth({ type }: { type: "signup" | "signin" }) {
  const [userDetails, setUserDetails] = useState<SignupInputTypes>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg w-[65%]">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        {type === "signup" ? "Create an Account" : "Sign In"}
      </h2>
      <p className="text-gray-600 mb-6">
        Already have an account?{" "}
        <Link to={"/signin"} className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
      <LabelledInput
        type="text"
        placeholder="Username"
        label="Username"
        onChange={(e) => {
          setUserDetails((prev) => ({
            ...prev,
            username: e.target.value,
          }));
        }}
      />
      <LabelledInput
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
      <LabelledInput
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
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
}

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputTypes) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        id={label}
        type={type}
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
