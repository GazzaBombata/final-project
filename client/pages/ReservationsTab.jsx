import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchReservations } from '../api/fetchReservations.js';
import { deleteReservation } from '../api/deleteReservation.js';
import { StyledTable, StyledTableRow, StyledTableCell, StyledTableHeader  } from '../components/styles.js';
import { useSelector } from 'react-redux';


const ReservationsTab = () => {
  const queryClient = useQueryClient();
  const [showPopup, setShowPopup] = useState(false);
  const restaurantId = useSelector(state => state.restaurantId);
  const [validationError, setValidationError] = useState(false);

  const { data: reservations, isLoading, isError } = useQuery(['reservations', restaurantId], () => fetchReservations(restaurantId));

  const mutationOnDelete = useMutation(deleteReservation, {
    onSuccess: () => {
      queryClient.refetchQueries(['reservations', restaurantId]);
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
          <th>People</th>
          <th>Status</th>
          <th>Table Number</th>
          <th>Actions</th>
        </tr>
      </StyledTableHeader>
        <tbody>
          {reservations.map((reservation) => (
            <StyledTableRow key={reservation.ReservationID}>
              <StyledTableCell>{reservation.ReservationTime}</StyledTableCell>
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

export default ReservationsTab;