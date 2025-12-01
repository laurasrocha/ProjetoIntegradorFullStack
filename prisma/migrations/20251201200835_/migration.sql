-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('DOCENTE', 'SUPERVISOR', 'DIRETOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "UUID" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "senha_cripto" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projetos" (
    "UUID" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "nome_projeto" TEXT NOT NULL,
    "descricao" TEXT DEFAULT 'sem descrição',
    "membros_projeto" TEXT NOT NULL,
    "turma_projeto" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "data_apresentacao" TEXT NOT NULL,
    "convidados" BOOLEAN NOT NULL,
    "detalhesConvidados" TEXT,
    "observacoes" TEXT,
    "status_projeto" TEXT DEFAULT 'Pendente',
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjetoArquivo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "ProjetoArquivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_UUID_key" ON "usuarios"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_usuario_key" ON "usuarios"("email_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "projetos_UUID_key" ON "projetos"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "projetos_id_key" ON "projetos"("id");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoArquivo" ADD CONSTRAINT "ProjetoArquivo_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
