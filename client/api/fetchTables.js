import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchTables = async (restaurantID) => {
  let res;

  try {
  
    res = await fetch(`http://localhost:8080/v1/restaurants/${restaurantID}/tables`, {
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