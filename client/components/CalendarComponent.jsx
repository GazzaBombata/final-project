import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchAvailableSlots } from '../api/fetchAvailableSlots.js';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { format } from 'date-fns';

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getTimes();
    console.log(date);
  }, [date]);

  const onChange = async newValue => {
    setValue(newValue);
    setDate((prev)=> ({...prev, justDate: newValue}));
  };

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const getTimes = async () => {
    if (!date.justDate) {
      return;
    }
    const response = await fetchAvailableSlots(id, date.justDate, partySize);
    const result = await response.json();
    console.log(result);
    setSlots(result);
  }


  return (
    <div>
      {date.justDate ? (
      slots.map(slot => (
        <div key={slot}>
          {format(new Date(`${date.justDate}T${slot}`), 'hh:mm a')}
        </div>
      ))
    ) :
      ( <Calendar onChange={onChange} value={value} minDate={ new Date() } maxDate={maxDate} /> )
    }
      
    </div>
  );
}

export default CalendarComponent;