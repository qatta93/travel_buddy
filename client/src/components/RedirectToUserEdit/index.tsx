import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface RestrictedRouteProps {
  children: JSX.Element,
}

const RedirectToUserEdit = ({ children }: RestrictedRouteProps): JSX.Element => {
  const user = useAppSelector((state) => state.user.user);

  if (user && user.username === 'pending') {
    return <Navigate to="/edit-user" />;
  }

  return children;
};

export default RedirectToUserEdit;
