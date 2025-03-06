import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForm1741254199749 implements MigrationInterface {
    name = 'AddForm1741254199749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`forms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`college\` varchar(255) NOT NULL, \`type\` enum ('University', 'CONTACT') NOT NULL DEFAULT 'University', \`user_latitude\` double NULL, \`user_longitude\` double NULL, \`college_latitude\` double NULL, \`college_longitude\` double NULL, \`user_distance_from_college\` double NULL, \`confirmation_token\` varchar(255) NULL, \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`is_phone_verified\` tinyint NOT NULL DEFAULT 0, \`phone_otp\` double NOT NULL DEFAULT 0, \`address\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`forms\``);
    }

}
