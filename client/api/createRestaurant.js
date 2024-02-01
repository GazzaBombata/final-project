import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const createRestaurant = async (restaurant) => {

  let res;

  try {
    res = await fetch('http://localhost:8080/v1/restaurants', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(restaurant),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(`Error: ${res.status}, ${errorData.message}`);
    }

    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }


};