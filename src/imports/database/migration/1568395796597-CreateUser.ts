/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUser1568395796597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment',
        },
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable('user');
  }
}
