import { Reservation, User, Restaurant } from '../models/Models';

const ReservationController = {
  createReservation: async (req, res) => {
    try {
      const reservation = await Reservation.createItem(req.user, req.body);
      res.status(201).json(reservation); // Created
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getReservations: async (req, res) => {
    try {
      const user = await User.findOne({ where: { UserfrontUserId: req.user.userId } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const reservations = await user.getReservations();

      res.json(reservations)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getReservationById: async (req, res) => {
    try {
      const reservation = await Reservation.readItem(req.params.id);
      if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  updateReservation: async (req, res) => {
    try {
      const reservation = await Reservation.updateItem(req.params.id, req.body);
      if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  deleteReservation: async (req, res) => {
    try {
      const reservation = await Reservation.deleteItem(req.params.id);
      if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getRestaurantReservations: async (req, res) => {
    try {
      const restaurant = await Restaurant.readItem(req.params.id);
      const reservations = await restaurant.getReservations();
      res.json(reservations);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getRestaurantTables: async (req, res) => {
    try {
      const restaurant = await Restaurant.readItem(req.params.id);
      const tables = await restaurant.getTables();
      res.json(tables);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  }
};

export default ReservationController;