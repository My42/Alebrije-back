import { expect } from 'chai';
import sinon from 'sinon';
import User from 'imports/database/entity/User';
import updateAccount from 'imports/graphql/resolvers/updateAccount';
import getDatabaseConnection from '../utils/getDatabaseConnection';
import { createUser } from '../fixtures';
import getDb from '../utils/getDb';


describe('updateAccount resolver', async () => {
  before(async () => {
    this.connection = await getDatabaseConnection();
    this.db = getDb();

    this.user = createUser();
    await this.db.save(this.user);
  });

  after(async () => {
    await this.db.delete(User, { });
    await this.connection.close();
  });

  it("should change the user's password", async () => {
    const ctx = {
      db: this.db,
      getUser: sinon.fake.returns(Promise.resolve(this.user)),
      jwtToken: 'jwt',
    };
    const password = 'bonjour0%';
    const input = { password };
    const lastPassword = this.user.password;
    const resp = await updateAccount(null, { input }, ctx);

    expect(resp.message).to.be.equal('User.updated');
    expect(resp.success).to.be.equal(true);
    expect(resp.code).to.be.equal('200');

    expect(ctx.getUser.callCount).to.be.equal(1);
    expect(ctx.getUser.getCall(0).args[0]).to.be.equal(ctx.jwtToken);
    expect(ctx.getUser.getCall(0).args[1]).to.be.equal(ctx.db);

    expect(lastPassword).to.not.be.equal(this.user.password);
    expect(lastPassword).to.be.be.not.equal(password);
  });
});
