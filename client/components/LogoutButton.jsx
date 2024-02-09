import React from "react";
import Userfront, { LogoutButton } from "@userfront/toolkit/react";
import { useDispatch } from 'react-redux';
import resetStates from '../functions-hooks/resetStates.js'

Userfront.init("wn9vz89b");

function App() {

  const handleClick = (event) => {
    resetStates();
  };

  return (
    <div onClick={handleClick}>
      <LogoutButton />
    </div>
  );
}

export default App;