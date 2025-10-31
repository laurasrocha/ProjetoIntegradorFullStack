/*
  Warnings:

  - Added the required column `usuarioId` to the `projetos` table without a default value. This is not possible if the table is not empty.

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
    "data_criacao" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "data_apresentacao" TEXT NOT NULL,
    "convidados" BOOLEAN NOT NULL,
    "detalhesConvidados" TEXT,
    "observacoes" TEXT NOT NULL,
    "status_projeto" TEXT DEFAULT 'Pendente',
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "projetos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_projetos" ("UUID", "convidados", "createdAt", "data_apresentacao", "data_criacao", "descricao", "detalhesConvidados", "id", "membros_projeto", "nome_projeto", "observacoes", "status_projeto", "turma_projeto", "updatedAt") SELECT "UUID", "convidados", "createdAt", "data_apresentacao", "data_criacao", "descricao", "detalhesConvidados", "id", "membros_projeto", "nome_projeto", "observacoes", "status_projeto", "turma_projeto", "updatedAt" FROM "projetos";
DROP TABLE "projetos";
ALTER TABLE "new_projetos" RENAME TO "projetos";
CREATE UNIQUE INDEX "projetos_UUID_key" ON "projetos"("UUID");
CREATE UNIQUE INDEX "projetos_id_key" ON "projetos"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
