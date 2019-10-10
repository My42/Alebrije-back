/* eslint-disable class-methods-use-this,import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterReservation1570392586892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE public.reservation 
            ADD COLUMN "userId" integer NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE public.reservation
            DROP COLUMN "userId";
    `);
  }
}
