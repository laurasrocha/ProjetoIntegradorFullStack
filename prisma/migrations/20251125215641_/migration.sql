/*
  Warnings:

  - A unique constraint covering the columns `[email_usuario]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_usuario_key" ON "usuarios"("email_usuario");
