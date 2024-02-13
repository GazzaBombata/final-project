import React from "react";
import Userfront, { SignupForm } from "@userfront/toolkit/react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, CenteredSection } from "../components/styles.js";
import Head from '../components/Head.jsx';


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
      <Head title="Tablebooks - Signup" description="Tablebooks signup page" siteContent="Tablebooks, restaurant reservations made simple" />
      <SignupForm />
      <CenteredSection>
        {Userfront.tokens.accessToken ? <PrimaryButton onClick={handleClickDashboard}>Go to Dashboard</PrimaryButton> : <PrimaryButton onClick={handleClick}>Login Instead</PrimaryButton>}
      </CenteredSection>
    </>
  )
}

export default App;