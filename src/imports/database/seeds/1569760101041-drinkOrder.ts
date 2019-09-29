/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import DrinkOrder from '../entity/DrinkOrder';
import drinkOrders from './data/drinkOrders';

export class drinkOrder1569760101041 implements MigrationInterface {
  public async up(): Promise<any> {
    await getConnection('seed').getRepository(DrinkOrder).save(drinkOrders);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE public."drinkOrder" RESTART IDENTITY CASCADE;');
  }
}
