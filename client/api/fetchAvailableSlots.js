import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchAvailableSlots = async (restaurantId, date, partySize) => {
  let res;

  const body = {
    restaurantId: restaurantId,
    date: date,
    partySize: partySize,
  };

  console.log(body)

  try {
  
    res = await fetch(`http://localhost:8080/v1/availableSlots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
      body: JSON.stringify(body),
    });


    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error: ${res.status}, ${errorData.message}`);
    }

    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }


};