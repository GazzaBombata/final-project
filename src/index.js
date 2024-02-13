import express from 'express';
import path from 'path';
import * as jose from 'jose';
import dotenv from 'dotenv';
import { createPublicKey } from 'crypto';
import multer from 'multer';
import { uploadImage } from './functions/uploadImage';
import  { makeUserAdmin } from './userfront/makeUserAdmin';
import cors from 'cors';
import UserController from './controllers/UserController.js';
import RestaurantController from './controllers/RestaurantController.js';
import ReservationController from './controllers/ReservationController.js';
import { User } from './models/Models.js';
import TableController from './controllers/TableController.js';



dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Enable all CORS requests
// app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ message: 'Invalid JSON' }); // Bad request
  }
  next();
});

const verifyJwt = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  const publicKeyPem = process.env.JWT_PUBLIC_KEY;


  const publicKey = createPublicKey({
    key: publicKeyPem,
    format: 'pem',
  });


  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const { payload } = await jose.jwtVerify(token, publicKey, {
        algorithms: ["RS256"]
      });

      req.user = payload;
      
      const jwtExpiration = payload.exp;
      const currentUnixTimestamp = Math.floor(Date.now() / 1000);

      if (currentUnixTimestamp > jwtExpiration) {
        console.log(err)
        res.status(403).json({ message: 'Expired token' });
      }

      next();
    } catch (err) {
      console.log(err)
      res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};



// User endpoints

app.get('/v1/check-login', verifyJwt, UserController.checkLogin);

app.get('/v1/users/:id', verifyJwt, UserController.getUserById);

app.put('/v1/users/:id', verifyJwt, UserController.updateUserById);

app.post('/v1/make-admin', verifyJwt, UserController.makeAdmin);

app.get('/v1/check-role', verifyJwt, UserController.checkRole);

app.delete('/v1/users/:id', verifyJwt, UserController.deleteUserById);

app.get('/v1/user/restaurant', verifyJwt, UserController.getUserRestaurant);

// Restaurant endpoints

app.post('/v1/upload', verifyJwt, upload.single('image'), RestaurantController.uploadImage);

app.post('/v1/restaurants', verifyJwt, RestaurantController.createRestaurant);

app.get('/v1/restaurants/:id', RestaurantController.getRestaurant);

app.put('/v1/restaurants/:id', verifyJwt, RestaurantController.updateRestaurant);

app.delete('/v1/restaurants/:id', verifyJwt, RestaurantController.deleteRestaurant);

app.post('/v1/tables', verifyJwt, TableController.createTable);

app.get('/v1/tables/:id', verifyJwt, TableController.getTable);

app.put('/v1/tables/:id', verifyJwt, TableController.updateTable);

app.delete('/v1/tables/:id', verifyJwt, TableController.deleteTable);

// Reservation endpoints

app.post('/v1/reservations', verifyJwt, ReservationController.createReservation);

app.get('/v1/reservations', verifyJwt, ReservationController.getReservations);

app.get('/v1/reservations/:id', verifyJwt, ReservationController.getReservationById);

app.put('/v1/reservations/:id', verifyJwt, ReservationController.updateReservation);

app.delete('/v1/reservations/:id', verifyJwt, ReservationController.deleteReservation);

app.post('/v1/availableSlots', RestaurantController.fetchAvailableSlots);

// Restaurant Reservations endpoints
app.get('/v1/restaurants/:id/reservations', verifyJwt, ReservationController.getRestaurantReservations);

app.get('/v1/restaurants/:id/tables', verifyJwt, ReservationController.getRestaurantTables);

app.post('/v1/webhook', async (req, res) => {

  try {
    const authorization = req.headers.authorization;
    const { mode, action, model, record } = req.body;

    // Validate the authorization header
    const expectedToken = `${process.env.USERFRONT_WEBHOOK_API_KEY}`;
    const bearerToken = `Bearer ${expectedToken}`;

    if (authorization !== bearerToken) {
      return res.status(401).json({ message: 'Unauthorized' }); // Unauthorized
    }

    // Handle the webhook based on the action
    if (model === 'user') {

      // const sequelize = mode === 'test' ? sequelizeTest : sequelizeProd;

      switch (action) {
        case 'create':
          const newUser = await User.created(record);
          return res.json(newUser);
        case 'delete':
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




// Serve the React application for all other paths
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


