import express from 'express';
import { User, Restaurant, Table, Reservation } from './models.js';

const app = express();

app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ message: 'Invalid JSON' }); // Bad request
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World by final-project!');
});


// User endpoints

app.post('/login', async (req, res) => {
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

app.post('/users', async (req, res) => {
  try {
    const user = await User.createItem(req.body);
    res.status(201).json(user); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/users/:id', async (req, res) => {
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

app.put('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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
app.post('/restaurants', async (req, res) => {
  try {
    const restaurant = await Restaurant.createItem(req.body);
    res.status(201).json(restaurant); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/restaurants/:id', async (req, res) => {
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

app.put('/restaurants/:id', async (req, res) => {
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

app.delete('/restaurants/:id', async (req, res) => {
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
app.post('/tables', async (req, res) => {
  try {
    const table = await Table.createItem(req.body);
    res.status(201).json(table); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/tables/:id', async (req, res) => {
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

app.put('/tables/:id', async (req, res) => {
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

app.delete('/tables/:id', async (req, res) => {
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
app.post('/reservations', async (req, res) => {
  try {
    const reservation = await Reservation.createItem(req.body);
    res.status(201).json(reservation); // Created
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/reservations/:id', async (req, res) => {
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

app.put('/reservations/:id', async (req, res) => {
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

app.delete('/reservations/:id', async (req, res) => {
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
app.get('/restaurants/:id/reservations', async (req, res) => {
  try {
    const restaurant = await Restaurant.readItem(req.params.id);
    const reservations = await restaurant.getReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.get('/restaurants/:id/tables', async (req, res) => {
  try {
    const restaurant = await Restaurant.readItem(req.params.id);
    const tables = await restaurant.getTables();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
  }
});

app.listen(process.env.PORT || 8080);


