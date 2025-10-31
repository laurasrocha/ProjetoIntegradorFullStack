/*
  Warnings:

  - Added the required column `createdAt` to the `projetos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projetos" (
    "UUID" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_projeto" TEXT NOT NULL,
    "descricao" TEXT DEFAULT 'sem descrição',
    "membros_projeto" TEXT NOT NULL,
    "turma_projeto" TEXT NOT NULL,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_apresentacao" TEXT NOT NULL,
    "convidados" BOOLEAN NOT NULL,
    "detalhesConvidados" TEXT,
    "observacoes" TEXT NOT NULL,
    "status_projeto" TEXT NOT NULL DEFAULT 'Pendente',
    "updateAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_projetos" ("UUID", "convidados", "data_apresentacao", "data_criacao", "descricao", "detalhesConvidados", "id", "membros_projeto", "nome_projeto", "observacoes", "status_projeto", "turma_projeto", "updateAt") SELECT "UUID", "convidados", "data_apresentacao", "data_criacao", "descricao", "detalhesConvidados", "id", "membros_projeto", "nome_projeto", "observacoes", "status_projeto", "turma_projeto", "updateAt" FROM "projetos";
DROP TABLE "projetos";
ALTER TABLE "new_projetos" RENAME TO "projetos";
CREATE UNIQUE INDEX "projetos_UUID_key" ON "projetos"("UUID");
CREATE UNIQUE INDEX "projetos_id_key" ON "projetos"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
