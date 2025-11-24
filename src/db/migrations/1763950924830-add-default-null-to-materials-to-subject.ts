import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultNullToMaterialsToSubject1763950924830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `subject` MODIFY `materials` JSON NULL"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `subject` ALTER COLUMN `materials` DROP NOT NULL"
        )
    }

}
