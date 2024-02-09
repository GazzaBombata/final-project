import { useNavigate } from 'react-router-dom';
import { checkLogin } from './checkLogin.js';
import Userfront from "@userfront/core";
import { setRedirectUrl } from '../redux/store.js';

Userfront.init('wn9vz89b');

export const checkUserLogin = async (navigate, dispatch) => {

  console.log('checking user login');
  const result = await checkLogin();
  if (!result) {
    if(dispatch && window.location.pathname !== "/login") {
      console.log(window.location.pathname);
      dispatch(setRedirectUrl(window.location.href));
      alert('You need to login to view your pages, we will redirect you to login / signup page.');
    }
    navigate('/login');
  }
};
