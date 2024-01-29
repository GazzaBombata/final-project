import express from 'express';
import { User, Restaurant, Table, Reservation } from './models/Models';
import path from 'path';
import jose from 'jose'; 

const app = express();

app.use(express.json());

app.use(express.static('client/dist'));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ message: 'Invalid JSON' }); // Bad request
  }
  next();
});

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const { payload } = await jose.jwtVerify(token, publicKey, {
        algorithms: ["RS256"]
      });

      req.user = payload;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

// Catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Hello, World by final-project!');
});



// User endpoints

app.get('/v1/users/:id', verifyJwt, async (req, res) => {
  try {
    
  const user = await User.userFrontReadItem(req.user.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.put('/v1/users/:id',  verifyJwt,  async (req, res) => {
  try {
    const user = await User.updateItem(req.user.userId, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.put('/v1/users/roles/:id', verifyJwt, async (req, res) => {

  try {
    const user = await User.makeAdmin(req.user.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.delete('/v1/users/:id', verifyJwt, async (req, res) => {
  try {
    const user = await User.deleteItem(req.user.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

// Restaurant endpoints
app.post('/v1/restaurants', verifyJwt, async (req, res) => {
  try {
    const restaurant = await Restaurant.createItem(req.user, req.body);
    res.status(201).json(restaurant); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/restaurants/:id', verifyJwt, async (req, res) => {
  try {
    const restaurant = await Restaurant.readItem(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.put('/v1/restaurants/:id', verifyJwt, async (req, res) => {
  try {
    const restaurant = await Restaurant.updateItem(req.params.id, req.body);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.delete('/v1/restaurants/:id', verifyJwt, async (req, res) => {
  try {
    const restaurant = await Restaurant.deleteItem(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});
// Table endpoints
app.post('/v1/tables', verifyJwt, async (req, res) => {
  try {
    const table = await Table.createItem(req.body);
    res.status(201).json(table); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/tables/:id', verifyJwt, async (req, res) => {
  try {
    const table = await Table.readItem(req.params.id);
    if (table) {
      res.json(table);
    } else {
      res.status(404).json({ message: 'Table not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.put('/v1/tables/:id', verifyJwt, async (req, res) => {
  try {
    const table = await Table.updateItem(req.params.id, req.body);
    if (table) {
      res.json(table);
    } else {
      res.status(404).json({ message: 'Table not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.delete('/v1/tables/:id', verifyJwt, async (req, res) => {
  try {
    const table = await Table.deleteItem(req.params.id);
    if (table) {
      res.json(table);
    } else {
      res.status(404).json({ message: 'Table not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

// Reservation endpoints
app.post('/v1/reservations', verifyJwt, async (req, res) => {
  try {
    const reservation = await Reservation.createItem(req.body);
    res.status(201).json(reservation); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/reservations/:id', verifyJwt, async (req, res) => {
  try {
    const reservation = await Reservation.readItem(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.put('/v1/reservations/:id', verifyJwt, async (req, res) => {
  try {
    const reservation = await Reservation.updateItem(req.params.id, req.body);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.delete('/v1/reservations/:id', verifyJwt, async (req, res) => {
  try {
    const reservation = await Reservation.deleteItem(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

// Restaurant Reservations endpoints
app.get('/v1/restaurants/:id/reservations', verifyJwt, async (req, res) => {
  try {
    const restaurant = await Restaurant.readItem(req.params.id);
    const reservations = await restaurant.getReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/restaurants/:id/tables', verifyJwt, async (req, res) => {
  try {
    const restaurant = await Restaurant.readItem(req.params.id);
    const tables = await restaurant.getTables();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.post('/v1/webhook', async (req, res) => {
  console.log('webhook')
  console.log(req.body)
  try {
    const authorization = req.headers.authorization;
    const { mode, action, model, record } = req.body;
    console.log(authorization)
    console.log(mode)
    console.log(action)
    console.log(model)
    console.log(record)
    // Validate the authorization header
    const expectedToken = `${process.env.USERFRONT_WEBHOOK_API_KEY}`;
    const bearerToken = `Bearer ${expectedToken}`;

    if (authorization !== bearerToken) {
      console.log('unauthorized')
      return res.status(401).json({ message: 'Unauthorized' }); // Unauthorized
    }

    // Handle the webhook based on the action
    if (model === 'user') {

      // const sequelize = mode === 'test' ? sequelizeTest : sequelizeProd;

      switch (action) {
        case 'create':
          // Handle the new user record
          // This might involve adding the user to your database
          console.log('webhook received, startign to create user')
          console.log(record)
          const newUser = await User.created(record);
          return res.json(newUser);
        case 'delete':
          // Handle the deleted user record
          // This might involve removing the user from your database
          const deletedUser = await User.deleted(record.userId);
          return res.json(deletedUser);
        default:
          return res.status(400).json({ message: 'Invalid action' }); // Bad Request
      }
    } else {
      console.log('invalid model')
      return res.status(400).json({ message: 'Invalid model' }); // Bad Request
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.listen(process.env.PORT || 8080);


