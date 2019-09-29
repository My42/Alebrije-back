/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReservation1569719332995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE public.reservation (
        id SERIAL NOT NULL,
        "date" TIMESTAMPTZ NOT NULL,
        "tableNumber" integer NOT NULL,
        
        CONSTRAINT "pk__reservation__id" PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('reservation');
  }
}
