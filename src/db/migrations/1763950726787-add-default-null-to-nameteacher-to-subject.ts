import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultNullToNameteacherToSubject1763950726787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `subject` MODIFY `nameTeacher` VARCHAR(255) NULL"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `subject` ALTER COLUMN `nameTeacher` DROP NOT NULL"
        )
    }

}
