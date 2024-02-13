import { User, Restaurant } from '../models/Models';
import { makeUserAdmin } from '../userfront/makeUserAdmin';


const UserController = {
  checkLogin: (req, res) => {
    // If the JWT is valid and not expired, req.user will contain the decoded token
    res.json({ message: 'Token is valid', user: req.user });
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.userFrontReadItem(req.user.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  updateUserById: async (req, res) => {
    try {
      const user = await User.updateItem(req.user.userId, req.body);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  makeAdmin: async (req, res) => {
    try {
      const user = await makeUserAdmin(req.user.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' }); // Not Found
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  checkRole: async (req, res) => {
    if (req.user.authorization.wn9vz89b) {
      try {
        const role = req.user.authorization.wn9vz89b.roles[0];
        if (role === 'owner') {
          res.json({ isOwner: true });
        } else {
          res.json({ isOwner: false });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
      }
    } else {
      res.json({ isOwner: false });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const user = await User.deleteItem(req.user.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getUserRestaurant: async (req, res) => {
    try {
      const user = await User.findOne({ where: { UserfrontUserId: req.user.userId } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const restaurant = await Restaurant.findOne({ where: { OwnerUserID: user.UserID } });
      if (!restaurant) {
        return res.json(null);
      }

      res.json(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

export default UserController;

