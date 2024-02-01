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


function DashboardPage() {
const { data, status } = useQuery('role', fetchRole, {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

const isOwner = data?.isOwner;
const isLoading = status === 'loading';

const dispatch = useDispatch();
const restaurantId = useSelector(state => state.restaurantId);

fetchRestaurantForUser().then((data) => {
  if (data) {
    dispatch(setRestaurantId(data.RestaurantID));
  };
}
);

  if (isLoading) {
    return null; // or return a loading indicator
  }

  if (!isOwner) {
    return <Navigate to="/login" replace />
  }

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
          <Routes>
            <Route path="restaurant" element={<RestaurantTab />} />
            <Route path="tables" element={<TablesTab />} />
            <Route path="reservations" element={<ReservationsTab />} />
          </Routes>
      </MainContentWithSideBar>
    </div>
  );
}

export default DashboardPage;