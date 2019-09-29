/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDrink1569720552774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE public.drink ADD COLUMN "volume" integer NOT NULL;');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE public.drink DROP COLUMN "volume";');
  }
}
