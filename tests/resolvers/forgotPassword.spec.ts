import { expect } from 'chai';
import sinon from 'sinon';
import forgotPassword, { forgotPasswordInput } from 'imports/graphql/resolvers/forgotPassword';
import Token from 'imports/database/entity/Token';
import User from 'imports/database/entity/User';
import {
  createUser,
} from '../fixtures';
import getDatabaseConnection from '../utils/getDatabaseConnection';
import getDb from '../utils/getDb';

const email = 'vincent@go-alebrije.io';
const input: forgotPasswordInput = { email };
const mailer = { forgotPassword: sinon.fake.returns(Promise.resolve(true)) };
const user = createUser({ email });
const user2 = createUser({ email: 'benjamin@go-alebrije.io' });

describe('forgotPassword resolver', () => {
  before(async () => {
    this.connection = await getDatabaseConnection();
    this.db = getDb();
    this.ctx = { db: this.db, mailer };
    await this.db.save(user);
  });

  after(async () => {
    await this.connection.close();
  });

  it('should create a new token and send email', async () => {
    const resp = await forgotPassword(null, { input }, this.ctx);
    const token = await this.db.findOne(Token, { userId: user.id });
    expect(resp.message).to.be.equal('Token.created');
    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(this.ctx.mailer.forgotPassword.callCount).to.be.equal(1);
    expect(this.ctx.mailer.forgotPassword.getCall(0).args[0]).to.be.equal(email);
    expect(this.ctx.mailer.forgotPassword.getCall(0).args[1])
      .to.be.deep.equal({ fullName: user.fullName, token: token.value });
  });

  it('should find an token', async () => {
    const resp = await forgotPassword(null, { input }, this.ctx);
    expect(resp.message).to.be.equal('Token.hasBeenFound');
    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(this.ctx.mailer.forgotPassword.callCount).to.be.equal(1);
  });

  it('shoudl change the password', async () => {
    const { value: token } = await this.db.findOne(Token, { userId: user.id });
    const resp = await forgotPassword(null, { input: { ...input, token, newPassword: 'coucou0%' } }, this.ctx);
    const { password } = await this.db.findOne(User, { id: user.id });
    expect(resp.message).to.be.equal('User.passwordUpdated');
    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(password).to.not.be.equal(user.password);
  });

  it('should not found the user', async () => {
    const resp = await forgotPassword(null, { input: { email: user2.email } }, this.ctx);
    expect(resp.message).to.be.equal('User.notFound');
    expect(resp.code).to.be.equal('404');
    expect(resp.success).to.be.equal(false);
  });

  it('should not found the user', async () => {
    const resp = await forgotPassword(null, { input: { email: user2.email, token: 'FAKE_TOKEN', newPassword: 'coucou0%' } }, this.ctx);
    expect(resp.message).to.be.equal('User.notFound');
    expect(resp.code).to.be.equal('404');
    expect(resp.success).to.be.equal(false);
  });
});
