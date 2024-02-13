import Userfront from "@userfront/core";

Userfront.init("wn9vz89b");

export const uploadRestaurantPhotos = async (file, name) => {
  const formData = new FormData();
  formData.append('image', file, name);

  try {
    const res = await fetch('/v1/upload', {
      headers: {
        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
      },
      method: 'POST',
      body: formData,
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