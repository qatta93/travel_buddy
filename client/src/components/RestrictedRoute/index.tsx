import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RestrictedRouteProps {
  children: JSX.Element,
}

const RestrictedRoute = ({ children }: RestrictedRouteProps): JSX.Element => {
  const user = null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return children;
};

export default RestrictedRoute;
