import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUserReservations } from '../api/fetchUserReservations.js';
import { deleteReservation } from '../api/deleteReservation.js';
import { StyledTable, StyledTableRow, StyledTableCell, StyledTableHeader  } from '../components/styles.js';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Userfront from "@userfront/core"; 
import { Navigate } from 'react-router-dom';
import { checkLogin } from '../api/checkLogin.js';
import { useEffect } from 'react';

Userfront.init("wn9vz89b");


const PersonalPage = () => {
  
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


  const queryClient = useQueryClient();
  const [validationError, setValidationError] = useState(false);

  const { data: reservations, isLoading, isError } = useQuery(['reservations'], () => fetchUserReservations());

  const mutationOnDelete = useMutation(deleteReservation, {
    onSuccess: () => {
      queryClient.refetchQueries(['reservations']);
      alert("Reservation Deleted");
    },
  });

  const handleDelete = (ReservationID) => {
    mutationOnDelete.mutate (ReservationID);
  };


  if (isLoading) return 'Loading...';
  if (isError) return 'An error occurred';

  return (
    <div>
      <h1>Reservations</h1>

      <StyledTable>
      <StyledTableHeader>
        <tr>
          <th>Time</th>
          <th>User</th>
          <th>People</th>
          <th>Status</th>
          <th>Table Number</th>
          <th>Actions</th>
        </tr>
      </StyledTableHeader>
        <tbody>
          {reservations.map((reservation) => (
            <StyledTableRow key={reservation.ReservationID}>
              <StyledTableCell>{format(parseISO(reservation.ReservationTime), 'dd/MM/yyyy HH:mm')}</StyledTableCell>
              <StyledTableCell>{reservation.UserID}</StyledTableCell>
              <StyledTableCell>{reservation.NumberOfPeople}</StyledTableCell>
              <StyledTableCell>{reservation.Status}</StyledTableCell>
              <StyledTableCell>{reservation.Table.TableNumber}</StyledTableCell>
              <StyledTableCell>
                <button onClick={() => handleDelete(reservation.ReservationID)}>Delete</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default PersonalPage;