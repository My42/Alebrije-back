/* eslint-disable class-methods-use-this,import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterReservationAddTableCount1572722073050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE public.reservation 
            ADD COLUMN "tableCount" integer DEFAULT 1
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE public.reservation 
            DROP COLUMN "tableCount"
    `);
  }
}
