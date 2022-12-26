import React from "react";
import Signup from "../../components/user/Signup/Signup";
import { userRegister } from "../../urls/urls";

function SignupPage() {
  return <Signup url={userRegister} />;
}

export default SignupPage;
