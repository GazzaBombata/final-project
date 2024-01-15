import assert, { strictEqual } from 'assert';
import { restore, stub } from 'sinon';
import bcrypt from 'bcrypt';
import { User } from '../models/Models.js';
import sinon from 'sinon';

describe('User model', function() {
  afterEach(function() {
    // Restore the default sandbox here
    restore();
  });

  describe('createItem', function() {
    it('should create a new user with hashed password', async function() {
      const genSaltStub = stub(bcrypt, 'genSalt');
      genSaltStub.returns(Promise.resolve('randomSalt'));

      const hashStub = stub(bcrypt, 'hash');
      hashStub.returns(Promise.resolve('hashedPassword'));

      const createStub = stub(User, 'create');
      createStub.returns(Promise.resolve({ username: 'test', password: 'hashedPassword' }));

      const user = await User.createItem({ username: 'test', password: 'password' });

      strictEqual(user.username, 'test');
      strictEqual(user.password, 'hashedPassword');
      assert(genSaltStub.calledOnce);
      assert(hashStub.calledOnce);
      assert(createStub.calledOnce);
    });
  });

  describe('checkPassword', function() {
    it('should check if the provided password matches the stored password', async function() {
      const compareStub = stub(bcrypt, 'compare');
      compareStub.returns(Promise.resolve(true));

      const user = new User({ username: 'test', password: 'hashedPassword' });

      const result = await user.checkPassword('password');

      strictEqual(result, true);
      assert(compareStub.calledOnce);
    });
  });

  describe('readItem', function() {
    it('should return a user if the user exists', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve({ id: 1, username: 'test', password: 'hashedPassword' }));

      const user = await User.readItem(1);

      strictEqual(user.id, 1);
      strictEqual(user.username, 'test');
      strictEqual(user.password, 'hashedPassword');
      assert(findByPkStub.calledOnce);
    });

    it('should return "user not found" if the user does not exist', async function() {
      const findByPkStub = stub(User, 'findByPk');
      findByPkStub.returns(Promise.resolve(null));

      const result = await User.readItem(1);

      strictEqual(result, 'user not found');
      assert(findByPkStub.calledOnce);
    });

    it('should return "id must be a number" if the id is not a number', async function() {
      const result = await User.readItem('notANumber');

      strictEqual(result, 'id must be a number');
    });
  });
  
  describe('updateItem', function() {
    it('should update a user if the user exists', async function() {
      const updateStub = sinon.stub(User, 'update');
      updateStub.returns(Promise.resolve([1]));

      const result = await User.updateItem(1, { username: 'updated' });

      assert.strictEqual(result, 'user updated');
      assert(updateStub.calledOnce);
    });

    it('should return "user not found" if the user does not exist', async function() {
      const updateStub = sinon.stub(User, 'update');
      updateStub.returns(Promise.resolve([0]));

      const result = await User.updateItem(1, { username: 'updated' });

      assert.strictEqual(result, 'user not found');
      assert(updateStub.calledOnce);
    });

    it('should return "id must be a number" if the id is not a number', async function() {
      const result = await User.updateItem('notANumber', { username: 'updated' });

      assert.strictEqual(result, 'id must be a number');
    });
  });

  describe('deleteItem', function() {
    it('should delete a user if the user exists', async function() {
      const destroyStub = sinon.stub(User, 'destroy');
      destroyStub.returns(Promise.resolve(1));

      const result = await User.deleteItem(1);

      assert.strictEqual(result, 'user deleted');
      assert(destroyStub.calledOnce);
    });

    it('should return "user not found" if the user does not exist', async function() {
      const destroyStub = sinon.stub(User, 'destroy');
      destroyStub.returns(Promise.resolve(0));

      const result = await User.deleteItem(1);

      assert.strictEqual(result, 'user not found');
      assert(destroyStub.calledOnce);
    });

    it('should return "id must be a number" if the id is not a number', async function() {
      const result = await User.deleteItem('notANumber');

      assert.strictEqual(result, 'id must be a number');
    });
  });
});