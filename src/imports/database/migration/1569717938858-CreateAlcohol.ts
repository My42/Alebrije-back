/* eslint-disable class-methods-use-this,import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAlcohol1569717938858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE public.alcohol (
        id SERIAL NOT NULL,
        "label" varchar(255) NOT NULL,
        "price" integer NOT NULL,
        
        CONSTRAINT "pk__alcohol__id" PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('alcohol');
  }
}
