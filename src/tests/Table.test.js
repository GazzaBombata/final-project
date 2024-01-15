import assert, { strictEqual } from 'assert';
import { restore, stub } from 'sinon';
import { Table } from '../models/Models.js';
import sinon from 'sinon';

describe('Table testing', function() {

  afterEach(function() {
    // Restore the default sandbox here
    restore();
  });
  
  describe('createItem', function() {
    it('should create a Table', async function() {
      const createStub = stub(Table, 'create');
      createStub.returns(Promise.resolve({ TableID: 1, RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 }));

      const result = await Table.createItem({ RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 });

      assert.deepStrictEqual(result, { TableID: 1, RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 });
      assert(createStub.calledOnce);
    });
  });

  describe('readItem', function() {
    it('should retrieve a Table', async function() {
      const findByPkStub = stub(Table, 'findByPk');
      findByPkStub.returns(Promise.resolve({ TableID: 1, RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 }));

      const result = await Table.readItem(1);

      assert.deepStrictEqual(result, { TableID: 1, RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 });
      assert(findByPkStub.calledOnce);
    });

    it('should throw an error with message "id must be a number" if the id is not a number', async function() {
      try {
        await Table.readItem('notANumber');
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }
    });

    it('should throw an error with message "table not found" if the table does not exist', async function() {
      const findByPkStub = stub(Table, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      try {
        await Table.readItem(1);
      } catch (error) {
        assert.strictEqual(error.message, 'table not found');
      }

      assert(findByPkStub.calledOnce);
    });
  });

  describe('updateItem', function() {
    it('should update a Table', async function() {
      const findByPkStub = stub(Table, 'findByPk');
      findByPkStub.returns(Promise.resolve({ TableID: 1, RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 }));

      const updateStub = stub(Table, 'update');
      updateStub.returns(Promise.resolve([1]));

      const result = await Table.updateItem(1, { CapacityMin: 3, CapacityMax: 6, Quantity: 7 });

      assert.deepStrictEqual(result, [1]);
      assert(findByPkStub.calledOnce);
      assert(updateStub.calledOnce);
    });

    it('should throw an error with message "id must be a number" if the id is not a number', async function() {
      try {
        await Table.updateItem('notANumber', { CapacityMin: 3, CapacityMax: 6, Quantity: 7 });
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }
    });

    it('should throw an error with message "table not found" if the table does not exist', async function() {
      const findByPkStub = stub(Table, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      try {
        await Table.updateItem(1, { CapacityMin: 3, CapacityMax: 6, Quantity: 7 });
      } catch (error) {
        assert.strictEqual(error.message, 'table not found');
      }

      assert(findByPkStub.calledOnce);
    });
  });

  describe('deleteItem', function() {
    it('should delete a Table', async function() {
      const findByPkStub = stub(Table, 'findByPk');
      findByPkStub.returns(Promise.resolve({ TableID: 1, RestaurantID: 1, CapacityMin: 2, CapacityMax: 4, Quantity: 5 }));

      const destroyStub = stub(Table, 'destroy');
      destroyStub.returns(Promise.resolve(1));

      const result = await Table.deleteItem(1);

      assert.strictEqual(result, 1);
      assert(destroyStub.calledOnce);
    });

    it('should throw an error with message "id must be a number" if the id is not a number', async function() {
      try {
        await Table.deleteItem('notANumber');
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }
    });

    it('should throw an error with message "table not found" if the table does not exist', async function() {
      const findByPkStub = stub(Table, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      const destroyStub = stub(Table, 'destroy');
      destroyStub.returns(Promise.resolve(null));

      try {
        await Table.deleteItem(1);
      } catch (error) {
        assert.strictEqual(error.message, 'table not found');
      }
    });
  });

  

describe('Table operations', function() {
  let createdTable;
  let id;

  it('should create a Table', async function() {
    createdTable = await Table.createItem({ CapacityMin: 2, CapacityMax: 4, Quantity: 5 });
    id = createdTable.dataValues.TableID;
    assert.strictEqual(createdTable.CapacityMin, 2);
  });

  it('should retrieve a Table', async function() {
    const retrievedTable = await Table.readItem(id);
    assert.strictEqual(retrievedTable.CapacityMin, 2);
  });

  it('should update a Table', async function() {
    const updatedTable = await Table.updateItem(id, { CapacityMin: 3, CapacityMax: 6, Quantity: 7 });
    assert.strictEqual(updatedTable[0], 1);
    const retrievedTable = await Table.readItem(id);
    assert.strictEqual(retrievedTable.CapacityMin, 3);
  });

  it('should delete a Table', async function() {
    const deletedCount = await Table.deleteItem(id);
    assert.strictEqual(deletedCount, 1);
  });
});
});


