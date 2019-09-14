/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, Table, TableIndex,
} from 'typeorm';

export default class CreateUser1568395796597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'fullName',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          length: '255',
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
      ],
    }), true);
    await queryRunner.query('ALTER TABLE "user" ADD COLUMN id SERIAL PRIMARY KEY;\n');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user');
  }
}
