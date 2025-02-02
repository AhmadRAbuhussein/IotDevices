import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738491088681 implements MigrationInterface {
    name = 'Migrations1738491088681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b17080419bd45586a3e78dfcc96" UNIQUE ("name"), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_datum" ("timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "temperature" double precision, "humidity" double precision, "pressure" double precision, "deviceId" integer, CONSTRAINT "PK_9d8a520f9fa64dc072914b150e1" PRIMARY KEY ("timestamp"))`);
        await queryRunner.query(`ALTER TABLE "device_datum" ADD CONSTRAINT "FK_0a3d088535b3765ba1bf41ea48a" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_datum" DROP CONSTRAINT "FK_0a3d088535b3765ba1bf41ea48a"`);
        await queryRunner.query(`DROP TABLE "device_datum"`);
        await queryRunner.query(`DROP TABLE "device"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
