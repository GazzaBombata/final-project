import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchAvailableSlots } from '../api/fetchAvailableSlots.js';
import { createReservation } from '../api/createReservation.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { format as formatDate } from 'date-fns';
import { PrimaryButton, SecondaryButton, VerticalContainer, HorizontalContainer, StyledPopup, StyledInput, StyledLabel } from '../components/styles.js';
import Userfront from "@userfront/core";
import { fetchRestaurant } from '../api/fetchRestaurant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirectUrl } from '../redux/store.js';
import { setDate } from '../redux/store.js';
import resetStates from '../functions-hooks/resetStates.js'
import { formatISO, isValid } from 'date-fns';

Userfront.init("wn9vz89b");

function CalendarComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(new Date());
  const date = useSelector(state => state.date);
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const { id } = useParams();
  const { data: restaurant, isLoading, error } = useQuery(['restaurant', id], () => fetchRestaurant(id));

  const checkLoggedIn = () => {
    // Check if the user is logged in (has Userfront.tokens.accessToken)
    if (Userfront.tokens.accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    checkLoggedIn(); // Function to check if the user is logged in
    getTimes();
    console.log(date);
  }, [date.justDate]);

  const onChange = async (newValue) => {
    setValue(newValue);
    console.log(newValue.toISOString());
    dispatch(setDate({ justDate: newValue.toISOString() }));
  
  };

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const getTimes = async () => {
    if (!date.justDate) {
      return;
    }
    const justDateObj = new Date(date.justDate);
    console.log(justDateObj)
    const response = await fetchAvailableSlots(id, justDateObj, partySize);
    setSlots(response.availableSlots);
  };

  const handleClick = (e) => {
    dispatch(setDate({ dateTime: e.target.innerText}));
    if (!isLoggedIn) {
      alert('You need to login to create a reservation, we will redirect you to login / signup page.');

      dispatch(setRedirectUrl(window.location.href));

      navigate('/login');
    }
  };

  const createRes = async () => {
    if (slots.length === 0) {
      await getTimes();
    }

    // Use date.dateTime instead of slot
    const slotInfo = slots.find(s => s.slot === date.dateTime);
    console.log(slotInfo);
  
    if (slotInfo && slotInfo.tableIds.length > 0) { 
      const justDateObj = new Date(date.justDate);
      const response = await createReservation(id, justDateObj, date.dateTime, partySize, slotInfo.tableIds[0]);
  
      if (response.ReservationID) {
        resetStates();
        navigate('/personal');
      } else {
        console.log(response.error)
      }
    }
  };

  const showPopup = () => {
    if (date.dateTime) {
      return (
        <StyledPopup>
          <div className="content">
            <p>Restaurant: {restaurant.Name}</p>
            <p>Date:  {formatDate(date.justDate, 'dd-MM-yyyy')}</p>
            <p>Time: {date.dateTime}</p>
            <p>Party Size: {partySize}</p>
            {/* Additional restaurant details */}
            {!isLoggedIn && <input type="email" placeholder="Enter your email" />}
            <PrimaryButton onClick={createRes}>Create Reservation</PrimaryButton>
            <SecondaryButton onClick={handleDateTimeReset}>
              Indietro
            </SecondaryButton>
          </div>
        </StyledPopup>
      );
    }
  };

  const handleDateReset = () => {
    dispatch(setDate({ justDate: null }));
  }

  const handleDateTimeReset = () => {
    dispatch(setDate({ dateTime: null }));
  }

  return (
    <VerticalContainer>
      <StyledLabel>
        <VerticalContainer>
          Party Size:
          <StyledInput type="number" value={partySize} onChange={(e) => {
              if (e.target.value >= 1) {
                setPartySize(e.target.value);
              }
            }}  />
        </VerticalContainer>
      </StyledLabel>
      {date.justDate ? (
        <VerticalContainer>
          <HorizontalContainer maxWidth="800px" wrap={value.toString()}>
            {slots.map((slot) => {
              const dateStr = formatDate(new Date(date.justDate), 'yyyy-MM-dd');

              const dateTime = new Date(`${dateStr}T${slot.slot}`);

              return (
                <PrimaryButton key={slot.slot} onClick={handleClick}>
                  {formatDate(dateTime, 'HH:mm')}
                </PrimaryButton>
              );
            })}
          </HorizontalContainer>
          <SecondaryButton onClick={handleDateReset} margin="10px 0px">
            Indietro
          </SecondaryButton>
        </VerticalContainer>
      ) : (
        <Calendar onChange={onChange} value={value} minDate={new Date()} maxDate={maxDate} />
      )}
      {showPopup()}
    </VerticalContainer>
  );
}

export default CalendarComponent;