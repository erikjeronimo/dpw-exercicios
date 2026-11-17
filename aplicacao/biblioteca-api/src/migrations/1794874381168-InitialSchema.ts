
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1794874381168 implements MigrationInterface {
  name = 'InitialSchema1794874381168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."exemplares_status_enum" AS ENUM('DISPONIVEL', 'DESGASTADO', 'DESCARTADO')`,
    );

    await queryRunner.query(
      `CREATE TABLE "autores" (
        "id" SERIAL NOT NULL,
        "nome" character varying(150) NOT NULL,
        CONSTRAINT "PK_8973029e8bb26f72a4738afc834" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "obras" (
        "id" SERIAL NOT NULL,
        "titulo" character varying(200) NOT NULL,
        "anoPublicacao" integer NOT NULL,
        "isbn" character varying(20),
        "autorId" integer NOT NULL,
        CONSTRAINT "PK_1645460dfba8e8c144ecd8436da" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "exemplares" (
        "id" SERIAL NOT NULL,
        "status" "public"."exemplares_status_enum" NOT NULL DEFAULT 'DISPONIVEL',
        "obraId" integer NOT NULL,
        CONSTRAINT "PK_f4dee0cd8e094ef06eb62bd285b" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "exemplares"
      ADD CONSTRAINT "FK_15705a047469b095c8586cc4234"
      FOREIGN KEY ("obraId") REFERENCES "obras"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "obras"
      ADD CONSTRAINT "FK_88aefb01d5ec72e85e1bbb05544"
      FOREIGN KEY ("autorId") REFERENCES "autores"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "obras" DROP CONSTRAINT "FK_88aefb01d5ec72e85e1bbb05544"`,
    );

    await queryRunner.query(
      `ALTER TABLE "exemplares" DROP CONSTRAINT "FK_15705a047469b095c8586cc4234"`,
    );

    await queryRunner.query(`DROP TABLE "exemplares"`);
    await queryRunner.query(`DROP TABLE "obras"`);
    await queryRunner.query(`DROP TABLE "autores"`);
    await queryRunner.query(
      `DROP TYPE "public"."exemplares_status_enum"`,
    );
  }
}
