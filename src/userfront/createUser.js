export async function createUser(user) {
// console.log('user: ' + JSON.stringify(user));

//   try {
//     const payload = {
//       email: user.Email,
//       name: user.Name,
//       password: user.Password,
//     };

//     const response = await fetch("https://api.userfront.com/v0/tenants/pn4grpmb/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`
//       },
//       body: JSON.stringify(payload)
//     });

//     console.log(response);

//     if (!response.ok) {
//       throw new Error("Error fetching data");
//     }

//     return response.json;
//   } catch (error) {
//     console.error(error);
//     // Handle the error here
//   }

const payload = {
  email: user.Email,
  name: user.Name,
  password: user.Password,
};

const response = await fetch("https://api.userfront.com/v0/tenants/wn9vz89b/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`
  },
  body: JSON.stringify(payload)
});

const responseData = await response.json();

return responseData;
}

