import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRedirectUrl } from '../redux/store';
import resetStates from './resetStates';


const redirectFunction = (redirectUrl, navigate) => {
  const path = new URL(redirectUrl).pathname;
  navigate(path);
  resetStates();
};

export default redirectFunction;