import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueRestrictionToNameSubject1763947361951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `subject` ADD CONSTRAINT `uq_subject_name` UNIQUE (`name`)"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `subject` DROP INDEX `uq_subject_name`"
        );
    }

}
