import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchRestaurantForUser = async () => {

  if (!Userfront.tokens.accessToken) {
    return false;
  }

  let res;

  try {
    res = await fetch('http://localhost:8080/v1/user/restaurant', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
    });

    console.log(res);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log(error);
  }

  const data = await res.json();

  return data;
};