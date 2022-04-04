import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface RestrictedRouteProps {
  children: JSX.Element,
}

const RestrictedRoute = ({ children }: RestrictedRouteProps): JSX.Element => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return children;
};

export default RestrictedRoute;
