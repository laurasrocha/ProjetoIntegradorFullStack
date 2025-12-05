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

export default function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [supervisor, setSupervisor] = useState(false);

  const router = useRouter();

  const btnAlternar = (checked) => {
    setSupervisor(checked);
    toast.success(checked ? "Olá, Supervisor(a)" : "Olá, Docente");
  };


  const handleLogin = async () => {
    console.log("SENDING:", { user, senha });

    try {
      const res = await fetch("/api/login_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, senha }),
      });

      const data = await res.json();
      console.log("RESPOSTA COMPLETA:", data);

      if (!res.ok) {
        toast.error(data.error || "Erro no login");
        return;
      }

      if (!data.usuario) {
        console.error("❌ data.usuario está undefined!");
        toast.error("Erro: usuário não encontrado");
        return;
      }

      // 🔵 Salvar nome e id do usuário logado
      localStorage.setItem("usuarioId", data.usuario.id);
      localStorage.setItem("usuarioNome", data.usuario.nome); // agora vai ter o nome correto


      toast.success("Login realizado!");

      const tipo = data.usuario.tipo_usuario;
      console.log("TIPO:", tipo);

      if (tipo === "SUPERVISOR") {
        router.push("/supervisor");
      } else {
        router.push("/docente");
      }

    } catch (err) {
      console.error("Erro no fetch de login:", err);
      toast.error("Erro ao conectar com o servidor");
    }
  };



  return (
    <div className="w-screen h-screen flex flex-col">
      <Header
        btnDesktop={
          <Link
            href="/"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
                     hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
           SAIR
          </Link>
        }
        btnMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
           SAIR
          </Link>
        }
        btnPjMobile={
          <Link
            href="/projetos"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            VER PROJETOS
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/projetos"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
                     hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
            VER PROJETOS
          </Link>
        }
      />
      <div className="relative w-full h-full bg-slate-100 dark:bg-gray-900 flex flex-col sm:flex-row overflow-hidden">
        {/* Lateral esquerda com gradiente */}
        <div className="hidden sm:flex w-1/2 h-full bg-gradient-to-br from-[#001F3F] via-[#003F7F] to-[#004A8D] dark:from-[#001F3F] dark:via-[#002A4A] dark:to-[#004A8D] text-white relative">
          {/* Título fixo mais no topo */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center px-6">
            <h1 className="text-3xl font-bold tracking-wide drop-shadow-md">
              Gestão de Projetos Integradores
            </h1>
          </div>

          {/* Imagem centralizada */}
          <div className="flex justify-center items-center w-full">
            <Image
              src="/logosenacbranco.png"
              alt="logo senac"
              width={220}
              height={160}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Área de login */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 px-6 sm:px-16 relative">
          <div className="absolute top-1 right-1">
            <ThemeSwitch />
          </div>

          {/* Card de login */}
          <div className="bg-slate-100 dark:bg-gray-900 sm:bg-white/80 sm:dark:bg-gray-800/80 backdrop-blur-lg sm:shadow-2xl rounded-2xl p-8 sm:p-10 w-[95vw] sm:w-[420px] flex flex-col items-center sm:mt-6 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-wide drop-shadow-md text-[#004A8D] dark:text-white">
              Login
            </h1>

            <div className="p-4 flex items-center space-x-4 mt-10">
              <span className="text-[#004A8D] dark:text-white font-semibold text-xs">
                Docente
              </span>

              <Switch
                checked={supervisor}
                onCheckedChange={btnAlternar}
                className="bg-[#f29100] data-[state=checked]:bg-[#004A8D]"
              />

              <span className="text-[#004A8D] dark:text-white font-sans font-semibold text-xs">
                Supervisor
              </span>
            </div>

            <div className="flex flex-col items-center space-y-4 w-full mt-6">
              <Input
                placeholder="Email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="border-2 border-[#004A8D] w-[80vw] h-[35px] sm:w-[350px] sm:h-[43px] text-xs sm:text-sm text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"
              />

              <Input
                placeholder="Senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border-2 border-[#004A8D] w-[80vw] h-[35px] sm:w-[350px] sm:h-[43px] text-xs sm:text-sm text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"
              />
            </div>

            <div className="flex flex-col items-center w-full mt-6">
              <button
                onClick={handleLogin}
                className="w-[150px] h-[35px] sm:w-[200px] sm:h-[40px] cursor-pointer text-center text-white py-2 sm:py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 mt-4"
              >
                Entrar
              </button>

              <Link
                href="/login2"
                className="mt-5 text-[#004A8D] dark:text-white font-sans text-sm w-[180px] text-center rounded hover:tracking-wide cursor-pointer"
              >
                Esqueci minha senha
              </Link>

              <Link
                href="/login/cadastro"
                className="mt-2 text-[#004A8D] dark:text-white font-semibold font-sans text-sm w-[180px] text-center rounded hover:tracking-wide cursor-pointer transition-all duration-300 hover:text-[#f29100]"
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
