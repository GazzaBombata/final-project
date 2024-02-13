import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchRole = async () => {

  if (!Userfront.tokens.accessToken) {
    return null;
  }

  let res;

  try {
    res = await fetch('/v1/check-role', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error('Network response was not ok');
    }

    return data;

  } catch (error) {
    console.log(error);
  }

};