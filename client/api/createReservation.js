import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const createReservation = async (RestaurantID, date, slot, partySize, TableID) => {
    console.log('createReservation', RestaurantID, date, slot, partySize, TableID);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const reservationTime = new Date(`${year}-${month}-${day}T${slot}`);

    const reservation = {
      RestaurantID: RestaurantID,
      ReservationTime: reservationTime,
      Duration: 60,
      NumberOfPeople: partySize,
      TableID: TableID,
      Status: 'confirmed'
    };

    let res;

    try {
      res = await fetch('http://localhost:8080/v1/reservations', {
        headers: {
          Authorization: `Bearer ${Userfront.tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(reservation),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        throw new Error(`Error: ${res.status}, ${errorData.message}`);
      }

      const data = await res.json();
      console.log(data);

      return data;

    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
}