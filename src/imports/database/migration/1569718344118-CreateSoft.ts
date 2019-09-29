/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSoft1569718344118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE public.soft (
        id SERIAL NOT NULL,
        "label" varchar(255) NOT NULL,
        "price" integer NOT NULL,
        
        CONSTRAINT "pk__soft__id" PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('soft');
  }
}
