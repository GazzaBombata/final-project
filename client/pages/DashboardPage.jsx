import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Userfront from "@userfront/core";
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Link } from "react-router-dom";
// import SetRestaurant from './SetRestaurant';
// import SetTables from './SetTables';
// import SetReservations from './SetReservations';

Userfront.init("wn9vz89b");

const fetchRole = async () => {

  console.log(Userfront.tokens.accessToken)

  let res;

  try {
  res = await fetch('http://localhost:8080/v1/check-role', {
    headers: {
      Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    },
  });
  console.log(res);

  if (!res.ok) {
    console.log('not ok');
    throw new Error('Network response was not ok');
  }
  } catch (error) {
    console.log(error);
  }

  const data = await res.json();
  console.log('ok');
  console.log(data);

  return data;
};

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
          {/* <Route path="/dashboard/restaurant" component={SetRestaurant} />
          <Route path="/dashboard/tables" component={SetTables} />
          <Route path="/dashboard/reservations" component={SetReservations} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;