import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const makeAdmin = async () => {

  if (!Userfront.tokens.accessToken) {
    return null;
  }

  let res;

  try {
    res = await fetch('/v1/make-admin', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        roles: [
          "owner"
        ]
      }),

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