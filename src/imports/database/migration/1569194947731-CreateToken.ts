/* eslint-disable class-methods-use-this,import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateToken1569192538224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE public.tokenType AS ENUM (
       'forgotPassword'
      )
    `);
    await queryRunner.query(`
      CREATE TABLE public.token (
        id SERIAL NOT NULL,
        "userId" integer NOT NULL,
        "type" tokenType NOT NULL,
        "value" varchar(255) NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        
        CONSTRAINT "pk__token__id" PRIMARY KEY (id),
        CONSTRAINT "fk__token__userId__user__id"
            FOREIGN KEY ("userId") REFERENCES public.user ("id") ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT "uq__token__userId__type" UNIQUE ("userId", "type")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('token');
  }
}
