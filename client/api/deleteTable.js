import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const deleteTable = async (tableID) => {

  let res;

  try {
    
    res = await fetch(`http://localhost:8080/v1/tables/${tableID}`, {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
      method: 'DELETE',
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