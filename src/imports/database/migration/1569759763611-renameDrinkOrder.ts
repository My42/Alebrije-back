/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameDrinkOrder1569759763611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE public.drinkorder RENAME TO "drinkOrder";');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE public."drinkOrder" RENAME TO "drinkorder";');
  }
}
