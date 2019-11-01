/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import Drink from '../entity/Drink';
import drinks from './data/drinks';
import DrinkOrder from '../entity/DrinkOrder';
import drinkOrders from './data/drinkOrders';
import Reservation from '../entity/Reservation';
import reservations from './data/reservations';
import User from '../entity/User';
import users from './data/users';

export class seeds1570395240936 implements MigrationInterface {
  public async up(): Promise<any> {
    const db = getConnection('seed');
    await db.getRepository(User).save(users);
    await db.getRepository(Drink).save(drinks);
    await db.getRepository(Reservation).save(reservations);
    await db.getRepository(DrinkOrder).save(drinkOrders);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE public.user RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE public.drink RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE public.reservation RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE public."drinkOrder" RESTART IDENTITY CASCADE;');
  }
}
