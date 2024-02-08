import { useNavigate } from 'react-router-dom';
import { checkLogin } from './checkLogin.js';
import Userfront from "@userfront/core";

Userfront.init('wn9vz89b');

export const checkUserLogin = async (navigate) => {

  console.log('checking user login');
  const result = await checkLogin();
  if (!result) {
    navigate('/login');
  }
};
