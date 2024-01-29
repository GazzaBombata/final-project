import Userfront from "@userfront/core";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route } from 'react-router-dom';

Userfront.init("wn9vz89b");

export function ProtectedRouteOwner({ element, ...rest }) {
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!Userfront.tokens.accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('/v1/check-role', {
          headers: {
            Authorization: `Bearer ${Userfront.tokens.accessToken}`
          }
        });
        setIsOwner(response.data.isOwner);
      } catch (error) {
        setIsOwner(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();
  }, []);

  return (
    <Route {...rest} element={
      isLoading ? null : (isOwner ? element : <Navigate to="/personalpage" replace />)
    } />
  );
}