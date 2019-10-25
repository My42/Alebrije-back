import { expect } from 'chai';
import sinon from 'sinon';
import User from 'imports/database/entity/User';
import Reservation from 'imports/database/entity/Reservation';
import Drink from 'imports/database/entity/Drink';
import DrinkOrder from 'imports/database/entity/DrinkOrder';
import deleteAccountResolver from 'imports/graphql/resolvers/deleteAccount';
import {
  createDrink,
  createDrinkOrder,
  createReservation,
  createUser,
} from '../fixtures';
import getDatabaseConnection from '../utils/getDatabaseConnection';
import getDb from '../utils/getDb';

describe('deleteAccount resolver', () => {
  before(async () => {
    this.connection = await getDatabaseConnection();
    this.db = getDb();
  });

  after(async () => {
    await this.connection.close();
  });


  beforeEach(async () => {
    this.user = createUser();
    this.userWithReservation = createUser();
    await this.db.save(User, [this.user, this.userWithReservation]);

    this.drink = createDrink({
      label: 'baba', volume: 75, price: 13, isSoft: false,
    });
    await this.db.save(Drink, this.drink);

    this.reservation = createReservation(this.userWithReservation.id);
    await this.db.save(Reservation, this.reservation);

    this.drinkOrder = createDrinkOrder(this.reservation.id, this.drink.id);
  });

  afterEach(async () => {
    await this.db.delete(User, { });
    await this.db.delete(Drink, { });
    await this.db.delete(Reservation, { });
    await this.db.delete(DrinkOrder, { });
  });

  const jwtToken = 'jwt';

  it('should delete the user account', async () => {
    const ctx = {
      db: this.db,
      getUser: sinon.fake.returns(Promise.resolve(this.user)),
      jwtToken,
    };
    const resp = await deleteAccountResolver(null, null, ctx);

    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(resp.message).to.be.equal('User.deleted');

    expect(ctx.getUser.callCount).to.be.equal(1);
    expect(ctx.getUser.getCall(0).args[0]).to.be.equal(jwtToken);
    expect(ctx.getUser.getCall(0).args[1]).to.be.equal(this.db);

    const u = await this.db.findOne(User, { id: this.user.id });
    expect(u).to.be.equal(undefined);
  });

  it('should delete the user and all his reservations', async () => {
    const ctx = {
      db: this.db,
      getUser: sinon.fake.returns(Promise.resolve(this.userWithReservation)),
      jwtToken,
    };
    const resp = await deleteAccountResolver(null, null, ctx);

    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(resp.message).to.be.equal('User.deleted');

    expect(ctx.getUser.callCount).to.be.equal(1);
    expect(ctx.getUser.getCall(0).args[0]).to.be.equal(jwtToken);
    expect(ctx.getUser.getCall(0).args[1]).to.be.equal(this.db);

    const user = await this.db.findOne(User, { id: this.userWithReservation.id });
    expect(user).to.be.equal(undefined);

    const reservation = await this.db.findOne(Reservation, { userId: this.userWithReservation.id });
    expect(reservation).to.be.equal(undefined);
  });

  it('should fail', async () => {
    const ctx = {
      db: {
        findOne: () => { throw new Error('test'); },
        delete: () => { throw new Error('test'); },
      },
      getUser: sinon.fake.returns(Promise.resolve(this.user)),
      jwtToken,
    };
    const resp = await deleteAccountResolver(null, null, ctx);

    expect(resp.success).to.be.equal(false);
    expect(resp.code).to.be.equal('500');
    expect(resp.message).to.be.equal('Error.internalServerError');
  });
});
