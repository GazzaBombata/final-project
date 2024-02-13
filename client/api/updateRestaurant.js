import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const updateRestaurant = async (restaurantID, restaurant) => {

  let res;

  try {
    restaurant.RestaurantID = restaurantID,
    
    res = await fetch(`/v1/restaurants/${restaurantID}`, {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(restaurant),
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