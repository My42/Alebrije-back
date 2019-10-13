import { expect } from 'chai';
import User from 'imports/database/entity/User';
import Reservation from 'imports/database/entity/Reservation';
import cancelReservationResolver, { Input as CancelReservationInput } from 'imports/graphql/resolvers/cancelReservation';

import sinon from 'sinon';
import {
  createReservation,
  createUser,
} from '../fixtures';
import getDatabaseConnection from '../utils/getDatabaseConnection';
import getDb from '../utils/getDb';
import reservations from '../../src/imports/database/seeds/data/reservations';


describe('cancelReservation resolver', () => {
  before(async () => {
    this.connection = await getDatabaseConnection();
    this.db = getDb();
  });

  beforeEach(async () => {
    this.user = createUser();
    this.user2 = createUser();
    await this.db.save(User, [this.user, this.user2]);
    this.reservation = createReservation(this.user.id);
    this.reservation2 = createReservation(this.user2.id, { tableNumber: 2 });
    await this.db.save(Reservation, [this.reservation, this.reservation2]);
  });

  afterEach(async () => {
    await this.db.delete(User, { });
    await this.db.delete(Reservation, { });
  });

  after(async () => {
    await this.connection.close();
  });

  const jwtToken = 'jwt';

  it('should cancel the reservation', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(this.user)));
    const ctx = { getUser, db: this.db, jwtToken };
    const input: CancelReservationInput = { id: this.reservation.id };

    const resp = await cancelReservationResolver(null, { input }, ctx);
    const reservation = await this.db.findOne(Reservation, { id: this.reservation.id });
    expect(getUser.callCount).to.be.equal(1);
    expect(getUser.getCall(0).args[0]).to.be.equal(jwtToken);
    expect(getUser.getCall(0).args[1]).to.be.equal(this.db);
    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(resp.message).to.be.equal('Reservation canceled');
    expect(reservation).to.be.equal(undefined);
  });

  it('should failed for reservation not found', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(this.user)));
    const ctx = { getUser, db: this.db };
    const input: CancelReservationInput = { id: -1 };

    const resp = await cancelReservationResolver(null, { input }, ctx);
    expect(resp.code).to.be.equal('404');
    expect(resp.success).to.be.equal(false);
    expect(resp.message).to.be.equal('Reservation not found');
  });

  it('should failed for forbidden cancel', async () => {
    const getUser = sinon.fake.returns(new Promise<User>(resolve => resolve(this.user)));
    const ctx = { getUser, db: this.db };
    const input: CancelReservationInput = { id: this.reservation2.id };

    const resp = await cancelReservationResolver(null, { input }, ctx);
    expect(resp.code).to.be.equal('403');
    expect(resp.success).to.be.equal(false);
    expect(resp.message).to.be.equal('Forbidden');
  });
});
