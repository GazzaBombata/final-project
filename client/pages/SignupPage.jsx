import React from "react";
import Userfront, { SignupForm } from "@userfront/toolkit/react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, CenteredSection } from "../components/styles.js";

Userfront.init("wn9vz89b");



function App() {

  const navigate = useNavigate();

const handleClick = () => {
  navigate("/login");
};

const handleClickDashboard = () => {
  navigate("/dashboard");
};
 
  return (
    <>
      <SignupForm />
      <CenteredSection>
      {Userfront.accessToken ? <PrimaryButton onClick={handleClickDashboard}>Go to Dashboard</PrimaryButton> : <PrimaryButton onClick={handleClick}>Login Instead</PrimaryButton>}
      </CenteredSection>
    </>
  )
}

export default App;