-- CreateTable
CREATE TABLE "projetos" (
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
    "updateAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "usuarios" (
    "UUID" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "senha_cripto" TEXT NOT NULL,
    "tipo_usuario" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "projetos_UUID_key" ON "projetos"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "projetos_id_key" ON "projetos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_UUID_key" ON "usuarios"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");
