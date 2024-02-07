import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const checkLogin = async () => {

  let res;

  try {
    res = await fetch('http://localhost:8080/v1/check-login', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};