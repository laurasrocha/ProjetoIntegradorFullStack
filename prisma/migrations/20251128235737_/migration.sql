-- DropForeignKey
ALTER TABLE "public"."projetos" DROP CONSTRAINT "projetos_usuarioId_fkey";

-- AlterTable
ALTER TABLE "projetos" ALTER COLUMN "usuarioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
