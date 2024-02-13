import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchRestaurant = async (id) => {

  let res;

  try {
    res = await fetch(`/v1/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
    });

    if (res.status === 404) {
      throw new Error('Restaurant not found');
    }


    if (!res.ok) {
      throw new Error('Network response not ok');
    }

  } catch (error) {
    
    console.log(error);
    throw error;
  }
  const data = await res.json();

  return data;
};