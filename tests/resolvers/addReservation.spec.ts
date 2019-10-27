import addDays from 'date-fns/addDays';
import addReservationResolver, { AddReservationInput, DrinkOrder as DrinkOrderInput } from 'imports/graphql/resolvers/addReservation';
import DrinkOrder from 'imports/database/entity/DrinkOrder';
import Drink from 'imports/database/entity/Drink';
import { expect } from 'chai';
import formatDate from 'date-fns/format';
import sinon from 'sinon';
import Reservation from 'imports/database/entity/Reservation';
import User from 'imports/database/entity/User';

import createUser from '../fixtures/createUser';
import getDatabaseConnection from '../utils/getDatabaseConnection';
import getDb from '../utils/getDb';
import createDrink from '../fixtures/createDrink';

describe('addReservation resolver', () => {
  const user = createUser();
  const drink = createDrink({
    isSoft: true, label: 'Ballentines', price: 42, volume: 75,
  });

  beforeEach(async () => {
    this.connection = await getDatabaseConnection();
    this.db = getDb();
    await this.db.save(User, user);
    await this.db.save(Drink, drink);
  });

  afterEach(async () => {
    await this.db.delete(Reservation, {});
    await this.db.delete(DrinkOrder, {});
    await this.db.delete(User, {});
    await this.db.delete(Drink, {});
    await this.connection.close();
  });

  const jwtToken = 'jwt';

  it('should add a reservation', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(user)));
    const ctx = { getUser, db: this.db, jwtToken };
    const quantity = 5;
    const date = formatDate(addDays(Date.now(), 10), 'MM/dd/yyyy');
    const drinkOrdersInput: [DrinkOrderInput] = [{ drinkId: drink.id, quantity }];
    const tableNumber = 1;
    const input: AddReservationInput = { tableNumber, date, drinkOrders: drinkOrdersInput };

    const resp = await addReservationResolver(null, { input }, ctx);
    const reservation = await this.db.findOne(Reservation, { userId: user.id });
    expect(reservation).to.not.be.equal(undefined);
    const drinkOrders = await this.db.find(DrinkOrder, {
      reservationId: reservation.id,
      drinkId: drink.id,
    });

    expect(getUser.callCount).to.be.equal(1);
    expect(getUser.getCall(0).args[0]).to.be.equal(jwtToken);
    expect(getUser.getCall(0).args[1]).to.be.equal(this.db);
    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(resp.message).to.be.equal('Reservation.added');
    expect(drinkOrders).to.not.be.equal(undefined);
    expect(drinkOrders).to.be.a('array');
    expect(drinkOrders).to.be.lengthOf(quantity);
  });

  it('should fail for a invalid date', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(user)));
    const ctx = { getUser, db: this.db, jwtToken };
    const invalidDates = ['alebrije', '23/12/1996', formatDate(Date.now(), 'MM/dd/yyyy')];

    const promises = invalidDates.map(async date => {
      const input: AddReservationInput = {
        tableNumber: 1,
        date,
        drinkOrders: null,
      };
      const reps = await addReservationResolver(null, { input }, ctx);
      expect(reps).to.be.deep.equal({ code: '400', success: false, message: 'Invalid.date' });
    });
    await Promise.all(promises);
    expect(getUser.callCount).to.be.equal(invalidDates.length);
  });

  it('should fail for table already taken', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(user)));
    const ctx = { getUser, db: this.db, jwtToken };
    const input: AddReservationInput = {
      tableNumber: 1,
      date: '12/01/2020',
      drinkOrders: null,
    };
    await addReservationResolver(null, { input }, ctx);
    const resp = await addReservationResolver(null, { input }, ctx);
    expect(resp.code).to.be.equal('403');
    expect(resp.message).to.be.equal('Table.alreadyTaken');
    expect(resp.success).to.be.equal(false);
  });

  it('should fail for invalid drink', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(user)));
    const ctx = { getUser, db: this.db, jwtToken };
    const input: AddReservationInput = {
      tableNumber: 1,
      date: '12/01/2020',
      drinkOrders: [{ drinkId: 42, quantity: 1 }],
    };
    const reps = await addReservationResolver(null, { input }, ctx);
    expect(reps.code).to.be.equal('400');
    expect(reps.message).to.be.equal('Invalid.drink');
    expect(reps.success).to.be.equal(false);
  });
});
