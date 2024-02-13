import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchRestaurantForUser = async () => {

  if (!Userfront.tokens.accessToken) {
    return false;
  }

  let res;

  try {
    res = await fetch('/v1/user/restaurant', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log(error);
  }

  const data = await res.json();

  return data;
};