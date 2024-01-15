import assert, { strictEqual } from 'assert';
import { restore, stub } from 'sinon';
import { Table, Restaurant, Reservation } from '../models/Models.js';
import sinon from 'sinon';

describe('Reservation testing', function() {

  afterEach(function() {
    // Restore the default sandbox here
    restore();
  });
  
  describe('createItem', function() {
    it('should create a Reservation', async function() {
      const createStub = stub(Reservation, 'create');
      createStub.returns(Promise.resolve({ ReservationID: 1, UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' }));

      const result = await Reservation.createItem({ UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' });

      assert.deepStrictEqual(result, { ReservationID: 1, UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' });
      assert(createStub.calledOnce);
    });
  });

  describe('readItem', function() {
    it('should retrieve a Reservation', async function() {
      const findByPkStub = stub(Reservation, 'findByPk');
      findByPkStub.returns(Promise.resolve({ ReservationID: 1, UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' }));

      const result = await Reservation.readItem(1);

      assert.deepStrictEqual(result, { ReservationID: 1, UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' });
      assert(findByPkStub.calledOnce);
    });

    it('should throw an error with message "id must be a number" if the id is not a number', async function() {
      try {
        await Reservation.readItem('notANumber');
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }
    });

    it('should throw an error with message "reservation not found" if the reservation does not exist', async function() {
      const findByPkStub = stub(Reservation, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      try {
        await Reservation.readItem(1);
      } catch (error) {
        assert.strictEqual(error.message, 'reservation not found');
      }

      assert(findByPkStub.calledOnce);
    });
  });

  describe('updateItem', function() {
    it('should update a Reservation', async function() {
      const findByPkStub = stub(Reservation, 'findByPk');
      findByPkStub.returns(Promise.resolve({ ReservationID: 1, UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' }));

      const updateStub = stub(Reservation, 'update');
      updateStub.returns(Promise.resolve([1]));

      const result = await Reservation.updateItem(1, { Duration: 3, NumberOfPeople: 6, SpecialRequests: 'Special requests updated', Status: 'Cancelled' });

      assert.deepStrictEqual(result, [1]);
      assert(findByPkStub.calledOnce);
      assert(updateStub.calledOnce);
    });

    it('should throw an error with message "id must be a number" if the id is not a number', async function() {
      try {
        await Reservation.updateItem('notANumber', { Duration: 3, NumberOfPeople: 6, SpecialRequests: 'Special requests updated', Status: 'Cancelled' });
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }
    });

    it('should throw an error with message "reservation not found" if the reservation does not exist', async function() {
      const findByPkStub = stub(Reservation, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      try {
        await Reservation.updateItem(1, { Duration: 3, NumberOfPeople: 6, SpecialRequests: 'Special requests updated', Status: 'Cancelled' });
      } catch (error) {
        assert.strictEqual(error.message, 'reservation not found');
      }

      assert(findByPkStub.calledOnce);
    });
  });

  describe('deleteItem', function() {
    it('should delete a Reservation', async function() {
      const findByPkStub = stub(Reservation, 'findByPk');
      findByPkStub.returns(Promise.resolve({ ReservationID: 1, UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' }));

      const destroyStub = stub(Reservation, 'destroy');
      destroyStub.returns(Promise.resolve(1));

      const result = await Reservation.deleteItem(1);

      assert.strictEqual(result, 1);
      assert(destroyStub.calledOnce);
    });

    it('should throw an error with message "id must be a number" if the id is not a number', async function() {
      try {
        await Reservation.deleteItem('notANumber');
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }
    });

    it('should throw an error with message "reservation not found" if the reservation does not exist', async function() {
      const findByPkStub = stub(Reservation, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      const destroyStub = stub(Reservation, 'destroy');
      destroyStub.returns(Promise.resolve(null));

      try {
        await Reservation.deleteItem(1);
      } catch (error) {
        assert.strictEqual(error.message, 'reservation not found');
      }
    });
  });

  describe('Reservation operations', function() {
    let createdReservation;
    let id;

    it('should create a Reservation', async function() {
      createdReservation = await Reservation.createItem({ UserID: 1, RestaurantID: 1, TableID: 1, ReservationTime: '2022-01-01 12:00:00', Duration: 2, NumberOfPeople: 4, SpecialRequests: 'No special requests', Status: 'Active' });
      id = createdReservation.dataValues.ReservationID;
      assert.strictEqual(createdReservation.UserID, 1);
    });

    it('should retrieve a Reservation', async function() {
      const retrievedReservation = await Reservation.readItem(id);
      assert.strictEqual(retrievedReservation.UserID, 1);
    });

    it('should update a Reservation', async function() {
      const updatedReservation = await Reservation.updateItem(id, { Duration: 3, NumberOfPeople: 6, SpecialRequests: 'Special requests updated', Status: 'Cancelled' });
      assert.strictEqual(updatedReservation[0], 1);
      const retrievedReservation = await Reservation.readItem(id);
      assert.strictEqual(retrievedReservation.Duration, 3);
    });

    it('should delete a Reservation', async function() {
      const deletedCount = await Reservation.deleteItem(id);
      assert.strictEqual(deletedCount, 1);
    });
  });

});
