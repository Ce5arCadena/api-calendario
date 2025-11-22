import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnStateToUsers1763686913510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD COLUMN "state" BOOLEAN DEFAULT FALSE AFTER "password"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN "state"`
        );
    }

}
