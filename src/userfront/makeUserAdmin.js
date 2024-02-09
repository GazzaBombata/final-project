export async function makeUserAdmin(userId) {

  console.log('makeUserAdmin called')
  console.log(userId)

const payload = {
  roles: [
    "owner"
  ]
};

const response = await fetch(`https://api.userfront.com/v0/tenants/wn9vz89b/users/${userId}/roles`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`
  },
  body: JSON.stringify(payload)
});

const responseData = await response.json();

console.log(responseData);

return responseData

}