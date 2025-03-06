import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfirmationTokenAndIsVerified1741181643901 implements MigrationInterface {
    name = 'AddConfirmationTokenAndIsVerified1741181643901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`forms\` ADD \`confirmation_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`forms\` ADD \`is_verified\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`forms\` DROP COLUMN \`is_verified\``);
        await queryRunner.query(`ALTER TABLE \`forms\` DROP COLUMN \`confirmation_token\``);
    }

}
