import { Table } from '../models/Models.js';

const TableController = {
  createTable: async (req, res) => {
    try {
      req.body.Quantity = 1;
      const table = await Table.createItem(req.user, req.body);
      res.status(201).json(table); // Created
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  getTable: async (req, res) => {
    try {
      const table = await Table.readItem(req.params.id);
      if (table) {
        res.json(table);
      } else {
        res.status(404).json({ message: 'Table not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  updateTable: async (req, res) => {
    try {
      const table = await Table.updateItem(req.params.id, req.body);
      if (table) {
        res.json(table);
      } else {
        res.status(404).json({ message: 'Table not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  },

  deleteTable: async (req, res) => {
    try {
      const table = await Table.deleteItem(req.params.id);
      if (table) {
        res.json(table);
      } else {
        res.status(404).json({ message: 'Table not found' }); // Not Found
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
  }
};

export default TableController;
