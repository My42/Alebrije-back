/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, getConnection, QueryRunner } from 'typeorm';
import Drink from '../entity/Drink';
import drinks from './data/drinks';

export class drinks1569721675723 implements MigrationInterface {
  public async up(): Promise<any> {
    await getConnection('seed').getRepository(Drink).save(drinks);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE public.drink CASCADE;');
  }
}
