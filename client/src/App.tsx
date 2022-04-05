import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchApi } from './helpers/api';
import { useAppDispatch } from './hooks';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Search from './components/Search';
import About from './components/About';
import Requests from './components/Requests';
import Trip from './components/Trip';
import CreateTrip from './components/CreateTrip';
import EditUser from './components/EditUser';
import RedirectToLogin from './components/RedirectToLogin';
import RedirectToUserEdit from './components/RedirectToUserEdit';
import { addUser } from './slices/user';
import { LoggedInUser } from './types';
import MyTrips from './components/MyTrips';
import MyTripRequests from './components/MyTrips/MyTripsRequests';
import './App.css';
import { DisplayUser } from './components/DisplayUser';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLoggedUser = async () => {
      const data = await fetchApi<LoggedInUser>('/api/auth/user');
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      dispatch(addUser(data.data));
    };
    getLoggedUser();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<RedirectToUserEdit><Home /></RedirectToUserEdit>} />
        <Route path="about-us" element={<RedirectToUserEdit><About /></RedirectToUserEdit>} />
        <Route
          path="create-trip"
          element={(
            <RedirectToLogin>
              <RedirectToUserEdit>
                <CreateTrip />
              </RedirectToUserEdit>
            </RedirectToLogin>
          )}
        />
        <Route path="trips">
          <Route index element={<RedirectToUserEdit><Search /></RedirectToUserEdit>} />
          <Route path=":id" element={<RedirectToUserEdit><Trip /></RedirectToUserEdit>} />
        </Route>
        <Route path="users">
          <Route path=":id" element={<DisplayUser />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route
          path="requests"
          element={(
            <RedirectToUserEdit>
              <RedirectToLogin>
                <Requests />
              </RedirectToLogin>
            </RedirectToUserEdit>
          )}
        />
        <Route
          path="profile"
          element={(
            <RedirectToUserEdit>
              <RedirectToLogin>
                <Profile />
              </RedirectToLogin>
            </RedirectToUserEdit>
          )}
        />
        <Route path="profile/my-trips">
          <Route
            index
            element={(
              <RedirectToUserEdit>
                <RedirectToLogin>
                  <MyTrips />
                </RedirectToLogin>
              </RedirectToUserEdit>
            )}
          />
          <Route
            path=":id"
            element={(
              <RedirectToUserEdit>
                <RedirectToLogin>
                  <MyTripRequests />
                </RedirectToLogin>
              </RedirectToUserEdit>
            )}
          />
        </Route>
        <Route
          path="edit-user"
          element={(<RedirectToLogin><EditUser /></RedirectToLogin>)}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
