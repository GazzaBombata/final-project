import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { fetchRole } from '../functions-hooks/fetchRole.js'
import RestaurantTab from './RestaurantTab';
import TablesTab from './TablesTab';
import ReservationsTab from './ReservationsTab';


function DashboardPage() {
  const { data, status } = useQuery('role', fetchRole);

  console.log(data);


const isOwner = data?.isOwner;
const isLoading = status === 'loading';

  if (isLoading) {
    return null; // or return a loading indicator
  }

  if (!isOwner) {
    console.log('not owner');
    <Navigate to="/login" replace />
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li><Link to="/dashboard/restaurant">Restaurant</Link></li>
          <li><Link to="/dashboard/tables">Tables</Link></li>
          <li><Link to="/dashboard/reservations">Reservations</Link></li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="/dashboard/restaurant" component={RestaurantTab} />
          <Route path="/dashboard/tables" component={TablesTab} />
          <Route path="/dashboard/reservations" component={ReservationsTab} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;