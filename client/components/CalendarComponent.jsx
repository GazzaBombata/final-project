import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchAvailableSlots } from '../api/fetchAvailableSlots.js';
import { createReservation } from '../api/createReservation.js';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { format as formatDate } from 'date-fns';
import { PrimaryButton, SecondaryButton, VerticalContainer, HorizontalContainer, StyledPopup } from '../components/styles.js';

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // isLoggedIn status

  const { id } = useParams();

  useEffect(() => {
    checkLoggedIn(); // Function to check if the user is logged in
    getTimes();
  }, [date.justDate]);

  const checkLoggedIn = () => {
    // Check if the user is logged in (has Userfront.tokens.accessToken)
    if (Userfront.tokens.accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const onChange = async (newValue) => {
    setValue(newValue);
    setDate((prev) => ({ ...prev, justDate: newValue }));
  };

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const getTimes = async () => {
    if (!date.justDate) {
      return;
    }
    const response = await fetchAvailableSlots(id, date.justDate, partySize);
    setSlots(response.availableSlots);
  };

  const handleClick = (e) => {
    console.log(e.target.innerText);
    console.log('slot selected');
    setDate((prev) => ({ ...prev, dateTime: e.target.innerText }));
  };

  const createRes = () => {
    console.log('Reservation created');
    // here I need to add a function that if the user is lot logged in check s if it exists and retrieve it, if it doesn't exist it will create it
    createReservation(id, date.justDate, date.dateTime, partySize);
  };

  const showPopup = () => {
    if (date.dateTime) {
      return (
        <StyledPopup>
          <div>
            <p>Date: {formatDate(date.justDate, 'yyyy-MM-dd')}</p>
            <p>Time: {date.dateTime}</p>
            <p>Party Size: {partySize}</p>
            <p>Restaurant: Restaurant Name</p>
            {/* Additional restaurant details */}
            {!isLoggedIn && <input type="email" placeholder="Enter your email" />}
            <button onClick={createRes}>Create Reservation</button>
          </div>
        </StyledPopup>
      );
    }
  };

  return (
    <div>
      {date.justDate ? (
        <VerticalContainer>
          <HorizontalContainer>
            {slots.map((slot) => {
              const dateStr = formatDate(date.justDate, 'yyyy-MM-dd');

              const dateTime = new Date(`${dateStr}T${slot}`);

              return (
                <PrimaryButton key={slot} onClick={handleClick}>
                  {formatDate(dateTime, 'HH:mm')}
                </PrimaryButton>
              );
            })}
          </HorizontalContainer>
          <SecondaryButton onClick={() => setDate({ justDate: null, dateTime: null })}>
            Indietro
          </SecondaryButton>
        </VerticalContainer>
      ) : (
        <Calendar onChange={onChange} value={value} minDate={new Date()} maxDate={maxDate} />
      )}
      {showPopup()}
    </div>
  );
}

export default CalendarComponent;