import React from "react";
import Userfront, { LoginForm } from "@userfront/toolkit/react";
import LogoutButton from "../components/LogoutButton";
import resetStates from "../functions-hooks/resetStates.js";
import { PrimaryButton } from "../components/styles.js";
import { useNavigate } from "react-router-dom";
import { VerticalContainer, CenteredSection } from "../components/styles.js";

Userfront.init("wn9vz89b");

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <LoginForm />
      <CenteredSection>
        <VerticalContainer $maxWidth="200px" $align="center">
          {Userfront.accessToken ? null : <PrimaryButton onClick={handleClick}>Signup Instead</PrimaryButton>}
        </VerticalContainer>
      </CenteredSection>
    </>
  );
}

export default App;