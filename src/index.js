import express from 'express';
import { User, Restaurant, Table, Reservation } from './models/Models';
import path from 'path';

const app = express();

app.use(express.json());

app.use(express.static('client/dist'));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ message: 'Invalid JSON' }); // Bad request
  }
  next();
});

// Catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Hello, World by final-project!');
});


// User endpoints

app.post('/v1/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // Not Found
      return;
    }
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' }); // Unauthorized
      return;
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.post('/v1/users', async (req, res) => {
  try {
    const user = await User.createItem(req.body);
    res.status(201).json(user); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/users/:id', async (req, res) => {
  try {
    const user = await User.readItem(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.put('/v1/users/:id', async (req, res) => {
  try {
    const user = await User.updateItem(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.delete('/v1/users/:id', async (req, res) => {
  try {
    const user = await User.deleteItem(req.params.id);
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
app.post('/v1/restaurants', async (req, res) => {
  try {
    const restaurant = await Restaurant.createItem(req.body);
    res.status(201).json(restaurant); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/restaurants/:id', async (req, res) => {
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

app.put('/v1/restaurants/:id', async (req, res) => {
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

app.delete('/v1/restaurants/:id', async (req, res) => {
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
app.post('/v1/tables', async (req, res) => {
  try {
    const table = await Table.createItem(req.body);
    res.status(201).json(table); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/tables/:id', async (req, res) => {
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

app.put('/v1/tables/:id', async (req, res) => {
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

app.delete('/v1/tables/:id', async (req, res) => {
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
app.post('/v1/reservations', async (req, res) => {
  try {
    const reservation = await Reservation.createItem(req.body);
    res.status(201).json(reservation); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/reservations/:id', async (req, res) => {
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

app.put('/v1/reservations/:id', async (req, res) => {
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

app.delete('/v1/reservations/:id', async (req, res) => {
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
app.get('/v1/restaurants/:id/reservations', async (req, res) => {
  try {
    const restaurant = await Restaurant.readItem(req.params.id);
    const reservations = await restaurant.getReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/v1/restaurants/:id/tables', async (req, res) => {
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

    // Validate the authorization header
    if (authorization !== "uf_test_webhook_wn9vz89b_941ffd20ff41448efbafadd81101c8df") {
      return res.status(401).json({ message: 'Unauthorized' }); // Unauthorized
    }

    // Handle the webhook based on the action
    if (model === 'user') {

      // const sequelize = mode === 'test' ? sequelizeTest : sequelizeProd;

      switch (action) {
        case 'create':
          // Handle the new user record
          // This might involve adding the user to your database
          console.log('weebhook received, startign to create user')
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
      return res.status(400).json({ message: 'Invalid model' }); // Bad Request
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.listen(process.env.PORT || 8080);


