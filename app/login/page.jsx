"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "../_components/header";
import Link from "next/link";
import ThemeSwitch from "../_components/themeSwitch";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";

export default function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [supervisor, setSupervisor] = useState(false);

  // Estados de erro
  const [errorUser, setErrorUser] = useState("");
  const [errorSenha, setErrorSenha] = useState("");

  const router = useRouter();

  // Alternar usuário (professor/supervisor)
  const btnAlternar = (checked) => {
    setSupervisor(checked);
    toast.success(checked ? "Olá, Supervisor(a)" : "Olá, Docente");
  };

  // -----------------------
  // 🔍 VALIDAÇÕES
  // -----------------------
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Digite um email válido.";
    return "";
  }

  function validarSenha(senha) {
    if (senha.length < 5) return "A senha deve ter no mínimo 5 caracteres.";
    if (senha.length > 10) return "A senha deve ter no máximo 10 caracteres.";
    return "";
  }

  // -----------------------
  // 🚀 LOGIN
  // -----------------------
  const handleLogin = async () => {
    const userErro = validarEmail(user);
    const senhaErro = validarSenha(senha);

    setErrorUser(userErro);
    setErrorSenha(senhaErro);

    if (!user || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (userErro || senhaErro) {
      toast.error("Corrija os erros antes de continuar.");
      return;
    }

    try {
      const res = await fetch("/api/login_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erro no login");
        return;
      }

      toast.success("Login realizado!");

      if (!data.usuario) {
        toast.error("Erro interno: usuário não encontrado.");
        return;
      }

      const tipo = data.usuario.tipo_usuario;

      if (tipo === "SUPERVISOR") {
        router.push("/supervisor");
      } else {
        router.push("/docente");
      }
    } catch (err) {
      toast.error("Erro ao conectar com o servidor");
      console.error(err);
    }
  };

  // -----------------------
  // 🧱 LAYOUT
  // -----------------------
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header
        btnDesktop={
          <Link
            href="/"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out hover:tracking-wide hover:bg-[#f29100] hover:text-white"
          >
            SAIR
          </Link>
        }
        btnMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 flex items-center justify-center"
          >
            SAIR
          </Link>
        }
        btnPjMobile={
          <Link
            href="/projetos"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 flex items-center justify-center"
          >
            VER PROJETOS
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/projetos"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500"
          >
            VER PROJETOS
          </Link>
        }
      />

      <div className="relative w-full h-full bg-slate-100 dark:bg-gray-900 flex flex-col sm:flex-row overflow-hidden">
        {/* Lateral esquerda */}
        <div className="hidden sm:flex w-1/2 h-full bg-gradient-to-br from-[#001F3F] via-[#003F7F] to-[#004A8D] text-white relative">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center px-6">
            <h1 className="text-3xl font-bold tracking-wide">
              Gestão de Projetos Integradores
            </h1>
          </div>

          <div className="flex justify-center items-center w-full">
            <Image
              src="/logosenacbranco.png"
              alt="logo senac"
              width={220}
              height={160}
            />
          </div>
        </div>

        {/* Área de login */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 px-6 sm:px-16 relative">
          <div className="absolute top-1 right-1">
            <ThemeSwitch />
          </div>

          <div className="bg-slate-100 dark:bg-gray-900 sm:bg-white/80 dark:sm:bg-gray-800/80 backdrop-blur-lg sm:shadow-2xl rounded-2xl p-8 sm:p-10 w-[95vw] sm:w-[420px] flex flex-col items-center mt-6 animate-fadeIn">
            <h1 className="text-3xl font-bold text-[#004A8D] dark:text-white">
              Login
            </h1>

            {/* Switch usuario */}
            <div className="p-4 flex items-center space-x-4 mt-10">
              <span className="text-[#004A8D] dark:text-white font-semibold text-xs">Docente</span>

              <Switch
                checked={supervisor}
                onCheckedChange={btnAlternar}
                className="bg-[#f29100] data-[state=checked]:bg-[#004A8D]"
              />

              <span className="text-[#004A8D] dark:text-white font-semibold text-xs">Supervisor</span>
            </div>

            {/* Campos */}
            <div className="flex flex-col items-center space-y-2 w-full mt-6">
              
              {/* Email */}
              <div className="flex flex-col w-[80vw] sm:w-[350px]">
                <Input
                  placeholder="Email"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                    setErrorUser(validarEmail(e.target.value));
                  }}
                  className={`border-2 ${
                    errorUser ? "border-red-500" : "border-[#004A8D]"
                  } w-full h-[35px] sm:h-[43px] text-xs sm:text-sm font-semibold rounded-xl`}
                />
                {errorUser && (
                  <p className="text-red-500 text-xs flex items-center mt-1 font-semibold">
                    <MdError className="mr-1" /> {errorUser}
                  </p>
                )}
              </div>

              {/* Senha */}
              <div className="flex flex-col w-[80vw] sm:w-[350px]">
                <Input
                  placeholder="Senha"
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setErrorSenha(validarSenha(e.target.value));
                  }}
                  className={`border-2 ${
                    errorSenha ? "border-red-500" : "border-[#004A8D]"
                  } w-full h-[35px] sm:h-[43px] text-xs sm:text-sm font-semibold rounded-xl`}
                />
                {errorSenha && (
                  <p className="text-red-500 text-xs flex items-center mt-1 font-semibold">
                    <MdError className="mr-1" /> {errorSenha}
                  </p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col items-center w-full mt-6">
              <button
                onClick={handleLogin}
                className="w-[150px] h-[35px] sm:w-[200px] sm:h-[40px] text-white rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all hover:bg-[#f29100]"
              >
                Entrar
              </button>

              <Link
                href="/login2"
                className="mt-5 text-[#004A8D] dark:text-white font-sans text-sm hover:tracking-wide"
              >
                Esqueci minha senha
              </Link>

              <Link
                href="/login/cadastro"
                className="mt-2 text-[#004A8D] dark:text-white font-semibold text-sm hover:text-[#f29100]"
              >
                Cadastrar usuário
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
