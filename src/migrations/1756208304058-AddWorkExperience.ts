import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkExperience1756208304058 implements MigrationInterface {
    name = 'AddWorkExperience1756208304058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`app_no\` ON \`applicants\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`applicants\``);
        await queryRunner.query(`CREATE TABLE \`work_experience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`position\` varchar(255) NOT NULL, \`companyName\` varchar(255) NOT NULL, \`startDate\` date NOT NULL, \`endDate\` date NULL, \`task\` text NOT NULL, \`images\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`applicant_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`surname\` \`surname\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`firstname\` \`firstname\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`app_no\` \`app_no\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD UNIQUE INDEX \`IDX_8a9385fc84917892cc4f878b77\` (\`app_no\`)`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD UNIQUE INDEX \`IDX_cf1d183c497a68c4f07fe62d80\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`department_id\` \`department_id\` int NOT NULL DEFAULT '81'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`stage\` \`stage\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`address\` \`address\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`course\` \`course\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`cohort\` \`cohort\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`session\` \`session\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`phone\` \`phone\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`work_experience\` ADD CONSTRAINT \`FK_244371cf661481924d5e8660281\` FOREIGN KEY (\`applicant_id\`) REFERENCES \`applicants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`work_experience\` DROP FOREIGN KEY \`FK_244371cf661481924d5e8660281\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD \`updated_at\` timestamp(0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD \`created_at\` timestamp(0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`phone\` \`phone\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`session\` \`session\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`cohort\` \`cohort\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`course\` \`course\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`address\` \`address\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`stage\` \`stage\` int NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`department_id\` \`department_id\` int NULL DEFAULT '81'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP INDEX \`IDX_cf1d183c497a68c4f07fe62d80\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP INDEX \`IDX_8a9385fc84917892cc4f878b77\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`app_no\` \`app_no\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`firstname\` \`firstname\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` CHANGE \`surname\` \`surname\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`applicants\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`applicants\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`DROP TABLE \`work_experience\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`applicants\` (\`email\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`app_no\` ON \`applicants\` (\`app_no\`)`);
    }

}
