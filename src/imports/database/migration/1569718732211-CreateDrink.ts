/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDrink1569718732211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE public.drink (
        id SERIAL NOT NULL,
        "label" varchar(255) NOT NULL,
        "price" integer NOT NULL,
        "isSoft" boolean NOT NULL,
        
        CONSTRAINT "pk__drink__id" PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('drink');
  }
}
