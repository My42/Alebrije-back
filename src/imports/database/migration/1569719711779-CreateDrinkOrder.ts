/* eslint-disable import/prefer-default-export,class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDrinkOrder1569719711779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE public.drinkOrder (
        id SERIAL NOT NULL,
        "reservationId" integer NOT NULL,
        "drinkId" integer NOT NULL,
        
        CONSTRAINT "pk__drinkOrder__id" PRIMARY KEY (id),
        CONSTRAINT "fk__drinkOrder__reservationId__reservation__id"
            FOREIGN KEY ("reservationId") REFERENCES public.reservation ("id") ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT "fk__drinkOrder__drinkId__drink__id"
            FOREIGN KEY ("drinkId") REFERENCES public.drink ("id") ON UPDATE CASCADE ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('drinkOrder');
  }
}
