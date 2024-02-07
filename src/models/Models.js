import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../database.js';
import { createUser } from '../userfront/createUser.js';
import { getUser } from '../userfront/getUser.js';
import { deleteUser } from '../userfront/deleteUser.js';
import { makeUserAdmin } from '../userfront/makeUserAdmin.js'; 
import { format } from 'date-fns';

const User = sequelize.define('User', {
  UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserfrontUserId: { type: DataTypes.STRING, allowNull: false, unique: true },
  ContactNumber: DataTypes.STRING,
  Email: DataTypes.STRING,
}, {
  tableName: 'Users'
});

const Restaurant = sequelize.define('Restaurant', {
  RestaurantID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: DataTypes.STRING,
  Address: DataTypes.STRING,
  OwnerUserID: { type: DataTypes.INTEGER, references: { model: 'User', key: 'UserID' } },
  PhoneNumber: DataTypes.STRING,
  Email: DataTypes.STRING,
  CoverPhoto: DataTypes.STRING,
  ProfilePhoto: DataTypes.STRING,
  OpeningTime: DataTypes.TIME,
  ClosingTime: DataTypes.TIME,
}, {
  tableName: 'Restaurants'
});

const Table = sequelize.define('Table', {
  TableID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  RestaurantID: { type: DataTypes.INTEGER, references: { model: 'Restaurant', key: 'RestaurantID' } },
  CapacityMin: DataTypes.INTEGER,
  CapacityMax: DataTypes.INTEGER,
  Quantity: DataTypes.INTEGER,
  TableNumber: DataTypes.INTEGER,
}, {
  tableName: 'Tables'
});

const Reservation = sequelize.define('Reservation', {
  ReservationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER, references: { model: 'User', key: 'UserID' } },
  RestaurantID: { type: DataTypes.INTEGER, references: { model: 'Restaurant', key: 'RestaurantID' } },
  TableID: { type: DataTypes.INTEGER, references: { model: 'Table', key: 'TableID' } },

  ReservationTime: DataTypes.DATE,
  Duration: DataTypes.INTEGER,
  NumberOfPeople: DataTypes.INTEGER,
  SpecialRequests: DataTypes.STRING,
  Status: DataTypes.STRING,
}, {
  tableName: 'Reservations'
});

User.hasMany(Restaurant, { foreignKey: 'OwnerUserID' });
Restaurant.belongsTo(User, { foreignKey: 'OwnerUserID' });

Restaurant.hasMany(Table, { foreignKey: 'RestaurantID' });
Table.belongsTo(Restaurant, { foreignKey: 'RestaurantID' });

User.hasMany(Reservation, { foreignKey: 'UserID' });
Reservation.belongsTo(User, { foreignKey: 'UserID' });

Restaurant.hasMany(Reservation, { foreignKey: 'RestaurantID' });
Reservation.belongsTo(Restaurant, { foreignKey: 'RestaurantID' });

Table.hasMany(Reservation, { foreignKey: 'TableID' });
Reservation.belongsTo(Table, { foreignKey: 'TableID' });

// User CRUD operations
User.createItem = async (item) => {

  try {
    const response = await createUser(item);
    item.UserfrontUserId = response.userId;
    delete item.Password;
    delete item.Name;
    console.log('starting sequelize')
    console.log(item)
    return await User.create(item);
  } catch (error) {
    conxole.log(error)
    throw error;
  }
};


User.readItem = async (id) => {
  try {
    if (isNaN(id)) {
      return "id must be a number";
    }
    
    const response = await User.findByPk(id);

    if (!response) {
      throw new Error("user not found");
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

User.userFrontReadItem = async (userFrontUserId) => {
  try {
    if (isNaN(userFrontUserId)) {
      return "id must be a number";
    }
    
    const user = await User.findOne({
      where: {
        UserfrontUserId: userFrontUserId
      }
    });

    if (!user) {
      throw new Error("user not found");
    }
    
    return (user.get({ plain: true }));
  } catch (error) {
    throw error;
  }
};

User.updateItem = async (id, item) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const user = await User.findOne({
      where: {
        UserfrontUserId: id
      }
    });
    
    if (!user) {
      throw new Error("user not found");
    }
    
    return await User.update(item, { where: { UserID: user.dataValues.UserID } });
  } catch (error) {
    throw error;
  }
};

User.deleteItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const user = await User.findOne({
      where: {
        UserfrontUserId: id
      }
    });


    if (!user) {
      throw new Error("userFront ID not found");
    }

    const userfrontResponse = await deleteUser(user.dataValues.UserfrontUserId);


    if (!userfrontResponse) {
      throw new Error("userFront not found");
    }

    const databaseResponse = await User.destroy({ where: { UserID: user.dataValues.UserID } });
    
    if (!databaseResponse) {
      throw new Error("user Database not found");
    }
    
    return databaseResponse;
  } catch (error) {
    throw error;
  }
};

User.makeAdmin = async (userFrontUserId) => {
  if (isNaN(userId)) {
    throw new Error("id must be a number");
  }
  
  return await makeUserAdmin(userFrontUserId);
}

User.prototype.getReservations = async function(startDate, endDate) {
  try {
    const where = { UserID: this.UserID };
    if (startDate && endDate) {
      where.ReservationTime = {
        [Op.between]: [startDate, endDate]
      };
    }
    return await Reservation.findAll({
      where,
      include: [
        { model: Restaurant },
        { model: Table }
      ]
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
};

// Restaurant CRUD operations
Restaurant.createItem = async (owner, item) => {
  console.log('starting createItem')
  console.log(owner)
  try {

    const user = await User.findOne({
      where: {
        UserfrontUserId: owner.userId
      }
    });

    if (!user) {
      console.log('user not found')
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    item.OwnerUserID = user.dataValues.UserID;
    console.log(item)
    
    return await Restaurant.create(item);
  } catch (error) {
    console.log(error)
    throw error;
  }
};

Restaurant.readItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      throw new Error("restaurant not found");
    }
    
    return restaurant;
  } catch (error) {
    throw error;
  }
};

Restaurant.updateItem = async (id, item) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      throw new Error("restaurant not found");
    }

    // if (!item.profilePhoto) {
    //   try {
    //     const file = item.profilePhoto;
    //     const imageUrl = await uploadImage(file);
    //     item.CoverPhoto = imageUrl;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // }

    // if (!item.coverPhoto) {
    //   try {
    //     const file = item.coverPhoto;
    //     const imageUrl = await uploadImage(file);
    //     item.CoverPhoto = imageUrl;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // }
    
    return await Restaurant.update(item, { where: { RestaurantID: id } });
  } catch (error) {
    throw error;
  }
};

Restaurant.deleteItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      throw new Error("restaurant not found");
    }
    
    return await Restaurant.destroy({ where: { RestaurantID: id } });
  } catch (error) {
    throw error;
  }
};


// Table CRUD operations
Table.createItem = async (owner, item) => {
  try {

    const user = await User.findOne({
      where: {
        UserfrontUserId: owner.userId
      }
    });

    const restaurant = await Restaurant.findOne({
      where: {
        OwnerUserID: user.dataValues.UserID
      }
    });

    item.RestaurantID = restaurant.dataValues.RestaurantID;

    return await Table.create(item);
  } catch (error) {
    throw error;
  }
};

Table.readItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const table = await Table.findByPk(id);
    
    if (!table) {
      throw new Error("table not found");
    }
    
    return table;
  } catch (error) {
    throw error;
  }
};

Table.updateItem = async (id, item) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const table = await Table.findByPk(id);
    
    if (!table) {
      throw new Error("table not found");
    }
    
    return await Table.update(item, { where: { TableID: id } });
  } catch (error) {
    throw error;
  }
};

Table.deleteItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const table = await Table.findByPk(id);
    
    if (!table) {
      throw new Error("table not found");
    }
    
    return await Table.destroy({ where: { TableID: id } });
  } catch (error) {
    throw error;
  }
};

// Reservation CRUD operations
Reservation.createItem = async (guest, item) => {
  try {

    const user = await User.findOne({
      where: {
        UserfrontUserId: guest.userId
      }
    });

    item.UserID = user.dataValues.UserID;

    const table = await Table.findOne({
      where: {
        TableID: item.TableID
      }
    });

    item.RestaurantID = table.dataValues.RestaurantID;

    return await Reservation.create(item);
  } catch (error) {
    throw error;
  }
};

Reservation.readItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const reservation = await Reservation.findByPk(id);
    
    if (!reservation) {
      throw new Error("reservation not found");
    }
    
    return reservation;
  } catch (error) {
    throw error;
  }
};

Reservation.updateItem = async (id, item) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const reservation = await Reservation.findByPk(id);
    
    if (!reservation) {
      throw new Error("reservation not found");
    }
    
    return await Reservation.update(item, { where: { ReservationID: id } });
  } catch (error) {
    throw error;
  }
};

Reservation.deleteItem = async (id) => {
  try {
    if (isNaN(id)) {
      throw new Error("id must be a number");
    }
    
    const reservation = await Reservation.findByPk(id);
    
    if (!reservation) {
      throw new Error("reservation not found");
    }
    
    return await Reservation.destroy({ where: { ReservationID: id } });
  } catch (error) {
    throw error;
  }
};

// List operations


Restaurant.prototype.getReservations = async function(startDate, endDate) {
  try {
    const whereClause = {
      RestaurantID: this.RestaurantID,
    };

    if (startDate && endDate) {
      whereClause.ReservationTime = {
        [Op.between]: [startDate, endDate]
      };
    }

    return await Reservation.findAll({
      where: whereClause,
      include: Table
    });
  } catch (error) {
    throw error;
  }
};

Restaurant.prototype.getTables = async function() {
  try {

    const tables = await Table.findAll({
      where: {
        RestaurantID: this.RestaurantID,
      }
    });

      if (!tables) {
        return null;
      };

      return tables;
  } catch (error) {
    throw error;
  }
};

Restaurant.findAvailableSlots = async function(restaurantId, date, partySize) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);

    const formattedDate = format(date, 'yyyy-MM-dd');

    const openingTime = restaurant.OpeningTime;
    const intOpeningTime = parseInt(openingTime.split(':')[0]);

    const closingTime = restaurant.ClosingTime;
    const intClosingTime = parseInt(closingTime.split(':')[0]);

    let startDate = new Date(formattedDate);
    startDate.setHours(openingTime.split(':')[0]);
    console.log(startDate)

    let endDate = new Date(formattedDate);
    endDate.setHours(closingTime.split(':')[0]);
    console.log(endDate)

    const reservations = await restaurant.getReservations(startDate, endDate);

    console.log(reservations)

    // Generate all possible slots for the day
    let slots = [];
    for (let hour = intOpeningTime; hour < intClosingTime; hour++) { 
      for (let minutes = 0; minutes < 60; minutes += 30) { 
        slots.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      }
    }


    // Fetch the tables for the restaurant
const tables = await restaurant.getTables();

// Filter out slots that conflict with existing reservations
const availableSlots = slots.map(slot => {
  console.log(`Checking slot at ${slot}`);
  console.log(date)
  // Convert slot to a Date object for comparison
  const slotStartTime = new Date(`${formattedDate}T${slot}:00`);
  const slotEndTime = new Date(slotStartTime.getTime() + 30 * 60000); // Add 30 minutes
  console.log(`Slot start time: ${slotStartTime}, slot end time: ${slotEndTime}`)

  // Check if slot overlaps with any reservation
  const conflictingReservations = reservations.filter(reservation => {
    console.log(`Checking reservation at ${reservation.dataValues.ReservationTime}`)
    const reservationStartTime = reservation.dataValues.ReservationTime;
    const reservationEndTime = new Date(reservationStartTime.getTime() + 30 * 60000); // Assuming 30 minutes duration
  
    // Check for overlap
    const isOverlapping = slotStartTime < reservationEndTime && slotEndTime > reservationStartTime;
    console.log(`Checking reservation at ${reservationStartTime}: overlaps with slot? ${isOverlapping}`);
    return isOverlapping;
  });
  
  // Check if there are enough tables available for the party size
  const availableTables = tables.filter(table => { 
    const isAvailable = table.dataValues.CapacityMin <= partySize && table.dataValues.CapacityMax >= partySize;
    return isAvailable;
  });
  
  const bookedTables = conflictingReservations.map(reservation => {
    console.log(`Reservation at ${reservation.dataValues.ReservationTime} has booked table ID ${reservation.dataValues.TableID}`);
    return reservation.dataValues.Table;
  });
  
  const unbookedTables = availableTables.filter(table => {
    if (bookedTables.length === 0) {
      return true;
    }
    console.log(table)
    console.log(bookedTables)
    const isUnbooked = !bookedTables.some(bookedTable => bookedTable.dataValues.TableID === table.dataValues.TableID);
    console.log(`Checking table ID ${table.dataValues.TableID}: is unbooked? ${isUnbooked}`);
    return isUnbooked;
  });
  console.log(`Unbooked table IDs:`, unbookedTables.map(table => table.dataValues.TableID))

  // Return the slot time and the available table IDs
  return {
    slot,
    tableIds: unbookedTables.length > 0 ? unbookedTables.map(table => table.dataValues.TableID) : [],
  };
}).filter(slotInfo => slotInfo.tableIds.length > 0);

console.log(availableSlots)

return availableSlots;

  } catch (error) {
    console.error('Error querying available slots:', error);
    throw error;
  }
};

User.created = async function(record) {
  try {
    let item = { UserfrontUserId: record.userId }
    return await User.create(item);
  } catch (error) { 
    console.log(error)
    throw error;
  }
}

User.deleted = async function(record) {
  try {
    return await User.destroy({ where: { UserfrontUserId: record.userId } });
  } catch (error) {
    throw error;
  }
}



export { User, Restaurant, Table, Reservation };