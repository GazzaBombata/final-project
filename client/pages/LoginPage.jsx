import React from "react";
import Userfront, { LoginForm } from "@userfront/toolkit/react";
import { PrimaryButton } from "../components/styles.js";
import { useNavigate } from "react-router-dom";
import { VerticalContainer, CenteredSection } from "../components/styles.js";
import { useSelector } from "react-redux";
import Head from "../components/Head.jsx";

Userfront.init("wn9vz89b");

function App() {

  const redirectUrl = useSelector(state => state.redirect.redirectUrl);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Head title="Tablebooks - login page" description="Login page for Tblebooks users" siteContent="Tablebooks, restaurant reservations made simple"/>
      <LoginForm />
      <CenteredSection>
        <VerticalContainer $maxWidth="200px" $align="center">
          {Userfront.tokens.accessToken ? null : <PrimaryButton onClick={handleClick}>Signup Instead</PrimaryButton>}
        </VerticalContainer>
      </CenteredSection>
    </>
  );
}

export default App;