import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRestaurant } from '../api/fetchRestaurant.js'; 
import CalendarComponent from '../components/CalendarComponent.jsx';

function ReservationPage() {
  const { id } = useParams();
  const { data: restaurant, isLoading, error } = useQuery(['restaurant', id], () => fetchRestaurant(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <img src={restaurant.CoverPhoto} alt="Cover" />
      <img style={{ borderRadius: '50%' }} src={restaurant.ProfilePhoto} alt="Profile" />
      <h1>{restaurant.Name}</h1>
      <p>{restaurant.Address}</p>
      <p>{restaurant.PhoneNumber}</p>
      <p>{restaurant.Email}</p>
      <p>Opening Time: {restaurant.OpeningTime}</p>
      <p>Closing Time: {restaurant.ClosingTime}</p>
      <CalendarComponent />
    </div>
  );
}

export default ReservationPage;