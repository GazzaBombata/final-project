import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const createRestaurant = async (restaurant) => {

  let res;

  console.log(restaurant);

  try {
    res = await fetch('/v1/restaurants', {
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
    console.log(data);

    return data;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }


};