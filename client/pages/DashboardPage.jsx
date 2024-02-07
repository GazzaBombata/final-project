import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { fetchRole } from '../functions-hooks/fetchRole.js'
import RestaurantTab from './RestaurantTab.jsx';
import TablesTab from './TablesTab.jsx';
import ReservationsTab from './ReservationsTab.jsx';
import { StyledSidebar, MainContentWithSideBar, StyledNavLink } from '../components/styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantId } from '../redux/store.js';
import { fetchRestaurantForUser } from '../api/fetchRestaurantForUser.js';
import useRedirect from '../functions-hooks/useRedirect.js';
import Userfront from "@userfront/core";
import { checkLogin } from '../api/checkLogin.js';

Userfront.init("wn9vz89b");

function DashboardPage() {

const redirectUrl = useSelector(state => state.redirect.redirectUrl);

const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(true);

const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const checkUserLogin = async () => {
    const result = await checkLogin();
    setIsLoggedIn(result);
  };

  checkUserLogin();
}, []);

if (!Userfront.accessToken) {
  return <Navigate to="/login" replace />
} else {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
}

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


  return (
    <div className="dashboard">
      <StyledSidebar>
        <ul>
          <li><StyledNavLink to="/dashboard/restaurant">Restaurant</StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/tables">Tables</StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/reservations">Reservations</StyledNavLink></li>
        </ul>
      </StyledSidebar>
      <MainContentWithSideBar>
        {!isLoadingRestaurant && (
          <Routes>
            <Route path="restaurant" element={<RestaurantTab />} />
            <Route path="tables" element={<TablesTab />} />
            <Route path="reservations" element={<ReservationsTab />} />
          </Routes>
        )}
      </MainContentWithSideBar>
    </div>
  );
}

export default DashboardPage;