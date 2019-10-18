import { expect } from 'chai'
import getDatabaseConnection from "../utils/getDatabaseConnection";
import getDb from "../utils/getDb";
import User from "../../src/imports/database/entity/User";
import { createUser } from "../fixtures";
import signInResolver, {signInArgs} from '../../src/imports/graphql/resolvers/signIn';
import {sign} from "jsonwebtoken";

describe('signIn resolver', () => {
  const signedUser = createUser();

  before(async () => {
    this.connection = await getDatabaseConnection();
    this.db = getDb();

    await this.db.save(signedUser);
  });

  after(async () => {
    await this.db.delete(User, {});
    await this.connection.close();
  });

  it('should sign in the user', async () => {
    const input: signInArgs = {
      email: signedUser.email,
      password: 'coucou0%'
    };

    const resp = await signInResolver(null, { input }, { db: this.db } );
    expect(resp.code).to.be.equal('200');
    expect(resp.message).to.be.equal('Authentication succeed');
    expect(resp.success).to.be.equal(true);
    expect(resp.token).to.not.be.equal(null);
    expect(resp.token).to.be.a('string');
    expect(resp.me).to.not.be.equal(null);
    expect(resp.me).to.be.a('object');
    expect(resp.me).to.have.all.keys(['id', 'fullName', 'email'])
  })

  it('should not sign in the user', async () => {
    const input: signInArgs = {
      email: signedUser.email,
      password: 'I miss you Tijuana'
    };

    const resp = await signInResolver(null, { input }, { db: this.db } );
    expect(resp.code).to.be.equal('401');
    expect(resp.success).to.be.equal(false);
    expect(resp.message).to.be.equal('Invalid email or password');
  })
});
