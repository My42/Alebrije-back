/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, getRepository, getConnection } from 'typeorm';
import Drink from '../entity/Drink';
import drinks from './data/drinks';

export class drinks1569721675723 implements MigrationInterface {
  public async up(): Promise<any> {
    await getConnection('seed').getRepository(Drink).save(drinks);
  }

  public async down(): Promise<any> {
    await getRepository(Drink).clear();
  }
}
