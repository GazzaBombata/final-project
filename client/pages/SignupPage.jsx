import React from "react";
import Userfront, { SignupForm } from "@userfront/toolkit/react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/styles.js";

Userfront.init("wn9vz89b");



function App() {

  const navigate = useNavigate();

const handleClick = () => {
  navigate("/login");
};
 
  return (
    <>
      <SignupForm />
      <PrimaryButton onClick={handleClick}>Login Instead</PrimaryButton>
    </>
  )
}

export default App;