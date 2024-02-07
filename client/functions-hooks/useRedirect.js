import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRedirectUrl } from '../redux/store';

const useRedirect = () => {

  const redirectUrl = useSelector(state => state.redirect.redirectUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectUrl) {
      const path = new URL(redirectUrl).pathname;
      navigate(path);
      dispatch(setRedirectUrl(null));
    }
  }, [redirectUrl, dispatch, navigate]);
};

export default useRedirect;