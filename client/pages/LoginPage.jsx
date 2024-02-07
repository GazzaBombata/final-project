import React from "react";
import Userfront, { LoginForm } from "@userfront/toolkit/react";
import LogoutButton from "../components/LogoutButton";
import resetStates from "../functions-hooks/resetStates.js";
import { PrimaryButton } from "../components/styles.js";
import { useNavigate } from "react-router-dom";

Userfront.init("wn9vz89b");

function App() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <LoginForm />
      <LogoutButton/>
      <PrimaryButton onClick={handleClick}>Signup Instead</PrimaryButton>
    </>
  );
}

export default App;