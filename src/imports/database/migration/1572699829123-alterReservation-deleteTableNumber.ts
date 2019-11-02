/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterReservationDeleteTableNumber1572699829123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE public.reservation 
            DROP CONSTRAINT "uq__reservation__date__tableNumber",
            DROP COLUMN "tableNumber"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE public.reservation
            ADD COLUMN "tableNumber" integer default NULL,
            ADD CONSTRAINT "uq__reservation__date__tableNumber" UNIQUE ("date", "tableNumber")
    `);
    const reservations = await queryRunner.query('SELECT * FROM reservation WHERE reservation."tableNumber" is NULL');
    for(const reservation of reservations) {
        await queryRunner.query(`
            UPDATE reservation
            SET "tableNumber" = ${reservation.id}
            WHERE reservation.id = ${reservation.id}
        `)
    }
      await queryRunner.query(`
        ALTER TABLE public.reservation
            ALTER COLUMN "tableNumber" SET NOT NULL;
    `);
  }
}
