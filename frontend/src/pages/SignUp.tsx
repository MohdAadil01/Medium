import React from "react";
import Quote from "../components/Quote";
import Auth from "../components/Auth";

function SignUp() {
  return (
    <div className="min-h-screen flex">
      <div className="flex w-1/2 items-center justify-center bg-white">
        <Auth type="signup" />
      </div>
      <div className="flex w-1/2 items-center justify-center bg-slate-200">
        <Quote />
      </div>
    </div>
  );
}

export default SignUp;
