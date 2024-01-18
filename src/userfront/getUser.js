export async function getUser(userId) {
  const response = await fetch(`https://api.userfront.com/v0/tenants/wn9vz89b/users/${userId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`
  }
});

const responseData = await response.json();

return responseData;
}
