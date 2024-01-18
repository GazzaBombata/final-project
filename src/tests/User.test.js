import assert, { strictEqual } from 'assert';
import { restore, stub } from 'sinon';
import { User } from '../models/Models.js';
import sinon from 'sinon';
import * as deleteUserModule from '../userfront/deleteUser.js';
import * as createUserModule from '../userfront/createUser.js';

describe('User model', function() {
  afterEach(function() {
    // Restore the default sandbox here
    restore();
  });

  describe('createItem', function() {
    it('should create a user', async () => {
      const item = {
        username: 'testuser',
        password: 'testpassword',
      };
  
      const userfrontResponse = {
        data: {
          userId: '123',
        },
      };
  
      const dbResponse = {
        ...item,
        UserfrontUserId: userfrontResponse.data.userId,
      };
  
      const createUserStub = sinon.stub(createUserModule, 'createUser').resolves(userfrontResponse);
      const dbCreateStub = sinon.stub(User, 'create').resolves(dbResponse);
  
      const result = await User.createItem(item);
  
      strictEqual(result.DataValues.UserId, 1);

      createUserStub.restore();
      dbCreateStub.restore();
    });
  });

  describe('readItem', function() {
    it('should return a user if the user exists', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve({ id: 1, username: 'test', password: 'hashedPassword' }));

      const user = await User.readItem(1);

      strictEqual(user.DataValues.UserId, 1);
      assert(findByPkStub.calledOnce);
    });

    it('should return "user not found" if the user does not exist', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      try {
        await User.readItem(1);
      }
      catch (error) {
        strictEqual(error.message, 'user not found');
      }

      assert(findByPkStub.calledOnce);
    });

    it('should return "id must be a number" if the id is not a number', async function() {
      try {
        await User.readItem('notANumber');
      } catch (error) { 
        strictEqual(error.message, 'id must be a number');
      };
    });
  });
  
  describe('updateItem', function() {
    it('should update a user if the user exists', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve({ id: 1, username: 'test', password: 'hashedPassword' }));
      
      const updateStub = sinon.stub(User, 'update');
      updateStub.returns(Promise.resolve([1]));

      const result = await User.updateItem(1, { username: 'updated' });

      assert.deepStrictEqual(result, [1]);
      assert(findByPkStub.calledOnce);
      assert(updateStub.calledOnce);
    });

    it('should throw an error with message "user not found" if the user does not exist', async function() {
      const findByPkStub = sinon.stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));
    
      try {
        await User.updateItem(1, { username: 'updated' });
      } catch (error) {
        assert.strictEqual(error.message, 'user not found');
      }
    
      assert(findByPkStub.calledOnce);
    });

    it('should return "id must be a number" if the id is not a number', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve({ id: 1, username: 'test', password: 'hashedPassword' }));
      

      try {
        await User.updateItem('notANumber', { username: 'updated' });
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }

    });
  });

  describe('deleteItem', function() {
    it('should delete a user if the user exists', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve({ UserID: 1, UserfrontUserId: 1, ContactNumber: '1234567890', Email: 'lel@lel.it' }));
      
      const destroyStub = sinon.stub(User, 'destroy');
      destroyStub.returns(Promise.resolve(1));

      const deleteUserStub = stub(deleteUserModule, 'deleteUser');
      deleteUserStub.returns(Promise.resolve({ status: 200 }));

      const result = await User.deleteItem(1);

      assert.strictEqual(result, (1));
      assert(destroyStub.calledOnce);
    });

    it('should return "user not found" if the user does not exist', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      const destroyStub = sinon.stub(User, 'destroy');
      destroyStub.returns(Promise.resolve(null));
      
    try {
        await User.deleteItem(1);
      } catch (error) {
        assert.strictEqual(error.message, 'user not found');
      }

    });

    it('should return "id must be a number" if the id is not a number', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve({ id: 1 }));
      
      try {
        await User.deleteItem('notANumber');
      } catch (error) {
        assert.strictEqual(error.message, 'id must be a number');
      }

    });
  });

  describe('User operations', function() {
    let createdUser;
    let id;
  
    it('should create a User', async function() {
      createdUser = await User.createItem({ Name: 'test', Password: 'hashedPassword1', ContactNumber: '1234567890', Email: 'test@test.it' });
      id = createdUser.dataValues.UserID;
      const retrievedUser = await User.readItem(id);
      console.log (retrievedUser)
      assert.strictEqual(createdUser.ContactNumber, '1234567890');
    });
  
    it('should retrieve a User', async function() {
      const retrievedUser = await User.readItem(id);
      assert.strictEqual(retrievedUser.ContactNumber, '1234567890');
    });
  
    it('should update a User', async function() {
      const updatedUser = await User.updateItem(id, { ContactNumber: '0987654321' });
      assert.strictEqual(updatedUser[0], 1); 
      const retrievedUser = await User.readItem(id);
      assert.strictEqual(retrievedUser.DataValues.ContactNumber, '0987654321');
    });
  
    it('should delete a User', async function() {
      const deletedCount = await User.deleteItem(id);
      assert.strictEqual(deletedCount, 1);
    });
  });
});

