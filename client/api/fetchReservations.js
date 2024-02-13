import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchReservations = async (restaurantID) => {
  let res;

  try {
  
    res = await fetch(`/v1/restaurants/${restaurantID}/reservations`, {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
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