/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import Reservation from '../entity/Reservation';
import reservations from './data/reservations';

export class reservations1569759136544 implements MigrationInterface {
  public async up(): Promise<any> {
    await getConnection('seed').getRepository(Reservation).save(reservations);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE public.reservation CASCADE;');
  }
}
