import React from "react";
import Userfront, { LoginForm } from "@userfront/toolkit/react";
import LogoutButton from "../components/LogoutButton";

Userfront.init("wn9vz89b");

function App() {
  return (
    <>
      <LoginForm />
      <LogoutButton />
    </>
  );
}

export default App;