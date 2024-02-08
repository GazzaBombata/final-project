import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { fetchRole } from '../functions-hooks/fetchRole.js'
import RestaurantTab from './RestaurantTab.jsx';
import TablesTab from './TablesTab.jsx';
import ReservationsTab from './ReservationsTab.jsx';
import { StyledSidebar, MainContentWithSideBar, StyledNavLink, NavSpan, HorizontalContainer } from '../components/styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantId } from '../redux/store.js';
import { fetchRestaurantForUser } from '../api/fetchRestaurantForUser.js';
import useRedirect from '../functions-hooks/useRedirect.js';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom';
import { checkUserLogin } from '../api/checkUserLogin.js';
import { Sidebar, Grommet, Avatar, Button, Nav, Main } from 'grommet';
import { Cafeteria, Restaurant, UserNew } from 'grommet-icons';
import LogoutButton from "../components/LogoutButton";

Userfront.init("wn9vz89b");

function DashboardPage() {

const navigate = useNavigate();

const redirectUrl = useSelector(state => state.redirect.redirectUrl);

const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(true);


useEffect(() => {
  if (!Userfront.accessToken) {
    navigate('/login');
  } else {
  checkUserLogin(navigate);
}}, []);


useEffect(() => {
  if (redirectUrl) {
    console.log(redirectUrl);
  }
}, [redirectUrl]);

useRedirect();

const { data, status } = useQuery('role', fetchRole, {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

const isOwner = data?.isOwner;
const isLoading = status === 'loading';

const dispatch = useDispatch();
const restaurantId = useSelector(state => state.restaurant.restaurantId);

useEffect(() => {
  fetchRestaurantForUser().then((data) => {
    console.log(data);
    if (data) {
      console.log(data.RestaurantID);
      dispatch(setRestaurantId(data.RestaurantID));
    };
    // Set loading state to false after restaurantId is set
    setIsLoadingRestaurant(false);
  });
}, [dispatch]);


  if (isLoading) {
    return null; // or return a loading indicator
  }

  if (!isOwner) {
    alert('You are not the owner');
    return <Navigate to="/login" replace />
  }

  if (isLoadingRestaurant) {
    return <p>Loading...</p>; // or a loading indicator
  }

  console.log(restaurantId);

  const RedirectToRestaurant = () => {
    useEffect(() => {
      navigate('/dashboard/restaurant');
    }, [navigate]);
  
    return null;
  };


  return (
    <>
      <StyledSidebar>
        <ul>
          <li><StyledNavLink to="/dashboard/restaurant"><Button icon={<Restaurant />} hoverIndicator /><NavSpan>Restaurant</NavSpan></StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/tables"><Button icon={<Cafeteria />} hoverIndicator /><NavSpan>Tables</NavSpan></StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/reservations"><Button icon={<UserNew />} hoverIndicator /><NavSpan>Reservations</NavSpan></StyledNavLink></li>
          <li><HorizontalContainer maxWidth="100px"><LogoutButton /></HorizontalContainer></li>
        </ul>
      </StyledSidebar>
      <MainContentWithSideBar>
        {!isLoadingRestaurant && (
          <Routes>
            <Route path="/" element={<RedirectToRestaurant />} />
            <Route path="restaurant" element={<RestaurantTab />} />
            <Route path="tables" element={<TablesTab />} />
            <Route path="reservations" element={<ReservationsTab />} />
          </Routes>
        )}
      </MainContentWithSideBar>
    </>
  );
}

export default DashboardPage;