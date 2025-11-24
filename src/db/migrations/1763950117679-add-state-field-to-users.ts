import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStateFieldToUsers1763950117679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` ADD COLUMN `state` BOOLEAN DEFAULT FALSE AFTER `password`"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` DROP COLUMN `state`"
        );
    }

}
