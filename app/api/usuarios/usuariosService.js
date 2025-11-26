// service Usuários
import { Prisma } from "@prisma/client";
//verificar como está importando o prisma e de onde
import { prisma } from "@/lib/prisma";

export const UsuariosService = {
  // MÉTODO PARA PEGAR TODOS REGISTROS
  getAll: async () => {
    try {
      //console.log("getAll Projetos....");
      const usuarios = await prisma.usuarios.findMany({});

      //retorna todos registros da tabela Blog_user
      return usuarios;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Um teste para os possíveis erros de regras do Schema Prisma (único, tamanho etc)
        console.log(
          `ATENÇÃO: Erro do Prisma, pesquise o código com a IA: ${error.code}`
        );
        switch (error.code) {
          case "P2000":
            return `Valor muito longo para um campo. ${error.code}`;
          case "P2001":
            return "Registro não encontrado.";
          case "P2002":
            return `Já existe um registro com esse valor em um campo único (${error.meta.target}).`;
          case "P2003":
            return "Violação de chave estrangeira.";
          case "P2004":
            return "Erro em restrição de banco de dados.";
            s;

          case "P2023":
            return "Campo errado na Tabela verifique o Formato corretos.";

          case "P2025":
            return "Registro que você tentou atualizar/deletar não existe.";
          default:
            return `Erro Prisma GetAll ${error.code}`;
        }
      }

      // Fallback para qualquer outro erro inesperado
      return `Erro inesperado getALL ${error} `;
    } finally {
      await prisma.$disconnect();
    }
  },

  // MÉTODO PARA PEGAR REGISTRO PELO ID
  // Método para buscar projeto pelo ID
  getByID: async (id) => {
    try {
      console.log(`Buscando projeto com ID: ${id}`);

      // Busca no banco usando Prisma
      const usuarios = await prisma.usuarios.findUnique({
        where: { id: id }, // ID convertido no route.js
      });

      return usuarios; // retorna o projeto procurado ou null
    } catch (erro) {
      console.log("Erro no Prisma:", erro);
      return null;
    }
  },

  // MÉTODO PARA DELETAR pelo ID
  deleteById: async (id) => {
    //deletando usando prisma
    //Sempre use o try-catch quando for ter interação com o Banco de Dados
    try {
      const messsage = `ID recebido ${id}`;
      console.log(messsage);
      const userId = parseInt(id);
      const deleteUser = await prisma.usuarios.delete({
        where: {
          userId: userId, // ou o nome da PK na sua tabela
        },
      });
      return deleteUser;
    } catch (error) {
      //ajuda muito no DEBUG - Boa Prática usar isso
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Um teste para os possíveis erros de regras do Schema Prisma (único, tamanho etc)
        console.log(
          `ATENÇÃO: Erro do Prisma, pesquise o código com a IA: ${error.code}`
        );
        switch (error.code) {
          case "P2000":
            return `Valor muito longo para um campo. ${error.code}`;
          case "P2001":
            return "Registro não encontrado.";
          case "P2002":
            return `Já existe um registro com esse valor em um campo único (${error.meta.target}).`;
          case "P2003":
            return "Violação de chave estrangeira.";
          case "P2004":
            return "Erro em restrição de banco de dados.";
          case "P2025":
            return "Registro que você tentou atualizar/deletar não existe.";
          case !id || id === null:
            return "id não definido na requisição";
          default:
            return "Erro de banco não tratado.";
        }
      }

      // Fallback para qualquer outro erro inesperado
      return "Erro inesperado delById.";
    } finally {
      console.log("desconectando o prisma...");
      await prisma.$disconnect();
    }
  },

  // MÉTODO PARA CRIAR UM USUARIO NOVO
  // =====================================================
  // MÉTODO: CRIAR UM NOVO PROJETO
  // =====================================================
  create: async (dados) => {
    try {
      console.log(" Dados recebidos em create:", dados);

      const novoUsuario = await prisma.usuarios.create({
        data: {
          nome_usuario: dados.nome_usuario,
          email_usuario: dados.email_usuario,
          senha_cripto: dados.senha_cripto,
          tipo_usuario: dados.tipo_usuario,

          // projetos: dados.projetos,
        },
      });

      console.log("Projeto criado:", novoUsuario);
      return novoUsuario;
      
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`⚠️ Erro Prisma (create): ${error.code}`);
        switch (error.code) {
          case "P2002":
            return `Campo duplicado: ${error.meta?.target}`;
          case "P2003":
            return "Violação de chave estrangeira.";
          default:
            return `Erro Prisma não tratado (${error.code})`;
        }
      }
      return `Erro inesperado em create: ${error.message}`;
    } finally {
      //await prisma.$disconnect();
    }
  },
};
