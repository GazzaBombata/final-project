import { Restaurant } from '../models/Models';
import { uploadImage } from '../functions/uploadImage';

const RestaurantController = {
  uploadImage: async (req, res) => {
    try {
      const file = req.file;
      const imageUrl = await uploadImage(file);
      res.json({ imageUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.createItem(req.user, req.body);
      res.status(201).json(restaurant); // Created
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.readItem(req.params.id);
      if (restaurant) {
        delete restaurant.dataValues.OwnerUserID; // Delete OwnerUserID
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' }); // Not Found
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'Restaurant not found') {
        res.status(404).json({ message: 'Restaurant not found' }); // Not Found
      } else {
        res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
      }
    }
  },

  updateRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.updateItem(req.params.id, req.body);
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  deleteRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.deleteItem(req.params.id);
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  fetchAvailableSlots: async (req, res) => {
    try {
      const { restaurantId, date, partySize } = req.body;

      if (!restaurantId || !date || !partySize) {
        return res.status(400).send({ message: 'Missing required fields' });
      }

      const availableSlots = await Restaurant.findAvailableSlots(restaurantId, date, partySize);
      res.send({ availableSlots });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching available slots' });
    }
  },
};

export default RestaurantController;
