import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForm1741164621185 implements MigrationInterface {
    name = 'AddForm1741164621185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`forms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`college\` enum ('Harvard University', 'MIT', 'Stanford University', 'Oxford University', 'Cambridge University') NOT NULL, \`type\` enum ('University', 'CONTACT') NOT NULL DEFAULT 'University', \`description\` text NOT NULL, \`latitude\` double NULL, \`longitude\` double NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`forms\``);
    }

}
