import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface RestrictedRouteProps {
  children: JSX.Element,
}

const RedirectToLogin = ({ children }: RestrictedRouteProps): JSX.Element => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RedirectToLogin;
