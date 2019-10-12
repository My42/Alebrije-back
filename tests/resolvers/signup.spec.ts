import { expect } from 'chai'
import getDatabaseConnection from '../utils/getDatabaseConnection';
import getDb from '../utils/getDb';
import signUpResolver from '../../src/imports/graphql/resolvers/signUp'
import User from '../../src/imports/database/entity/User';
import { createUser } from '../fixtures'

describe('signUp resolver', () => {
  const correctUser = createUser();
  const incorrectUsersInvalidEmail = [
    createUser({ email: '' }),
    createUser({ email: 'vincent@' }),
    createUser({ email: 'vincent@qs' }),
  ];
  const incorrectUsersInvalidPassword = [
    createUser({ password: '' }),
    createUser({ password: 'abcd' }),
    createUser({ password: '123456789' })
  ];
  const incorrectUsersInvalidFullName = [
    createUser({ fullName: '' }),
  ];


  before(async () => {
    await getDatabaseConnection();
    this.db = getDb();
  });

  after(async () => {
    await this.db.delete(User, {})
  });

  it('should sign up the user', async () => {
    const resp = await signUpResolver(null, { input: {  ...correctUser } }, { db: this.db });
    const user = await this.db.findOne(User, { email: correctUser.email });
    const users = await this.db.find(User, { });

    expect(resp.code).to.be.equal('200');
    expect(resp.success).to.be.equal(true);
    expect(user).to.not.be.equal(undefined);
  });

  it('should return 409', async () => {
    const resp = await signUpResolver(null, { input: {  ...correctUser } }, { db: this.db });

    expect(resp.code).to.be.equal('409');
    expect(resp.success).to.be.equal(false);
  });

  it('should sign up no ones for invalid email', async () => {
      const promises = incorrectUsersInvalidEmail.map(user => (
        signUpResolver(null, { input: user }, { db: this.db })
      ));
    const responses = await Promise.all(promises);
    expect(responses).to.be.deep
      .equal(new Array(incorrectUsersInvalidEmail.length)
        .fill({ code: '400', message: 'Invalid email', success: false }))
  });

  it('should sign up no ones for invalid password', async () => {
      const promises = incorrectUsersInvalidPassword.map(user => (
        signUpResolver(null, { input: user }, { db: this.db })
      ));
    const responses = await Promise.all(promises);
    expect(responses).to.be.deep
      .equal(new Array(incorrectUsersInvalidPassword.length)
        .fill({ code: '400', message: 'Invalid password', success: false }))
  });

  it('should sign up no ones for invalid full name', async () => {
    const promises = incorrectUsersInvalidFullName.map(user => (
      signUpResolver(null, { input: user }, { db: this.db })
    ));
    const responses = await Promise.all(promises);
    expect(responses).to.be.deep
      .equal(new Array(incorrectUsersInvalidFullName.length)
        .fill({ code: '400', message: 'Invalid full name', success: false }))
  })
});
