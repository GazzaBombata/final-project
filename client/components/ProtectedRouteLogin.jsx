import { Navigate, Route } from 'react-router-dom';
import Userfront from "@userfront/core";
Userfront.init("wn9vz89b");

function ProtectedRouteLogin({ element, ...rest }) {
  return Userfront.tokens.accessToken ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}
