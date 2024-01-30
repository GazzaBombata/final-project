import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const fetchRole = async () => {
  console.log(Userfront.tokens.accessToken)

  let res;

  try {
    res = await fetch('http://localhost:8080/v1/check-role', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
    });
    console.log(res);

    if (!res.ok) {
      console.log('not ok');
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log(error);
  }

  const data = await res.json();
  console.log('ok');
  console.log(data);

  return data;
};