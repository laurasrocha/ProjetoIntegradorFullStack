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

  const handleLogin = () => {
    if (!user.trim() || !senha.trim()) {
      toast.error("Por favor, preencha os campos corretamente!");
      return;
    }
    router.replace(supervisor ? "/supervisor" : "/docente");
  };

  return (
    <div className="w-screen h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center">
      <Header
        btnDesktop={
          <Link
            href="/"
            className="px-4 h-[40px] cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xl font-semibold uppercase transition-all duration-500 ease-in-out
                       hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                       active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                       items-center justify-center text-center"
          >
            Sair
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/projetos"
            className="px-4 h-[40px] cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xl tracking-wider uppercase transition-all duration-500 ease-in-out
                       hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                       active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
            PROJETOS
          </Link>
        }
      />

      <div className="flex flex-col items-center w-full mt-6">
        <div className="flex justify-end w-full p-4">
          <ThemeSwitch />
        </div>

        <h1
          className="text-[#004A8D] dark:text-white text-xl font-sans font-semibold mt-6 
"
        >
          Transformando vidas através da Tecnologia.
        </h1>

        <div className="flex flex-col items-center mt-6">
          <Image src="/logosenac.png" alt="Logo" width={100} height={100} />

          <div className="flex items-center space-x-4 mt-6">
            <span className="text-[#004A8D] dark:text-white font-semibold text-xl">
              Docente
            </span>

            <Switch
              checked={supervisor}
              onCheckedChange={btnAlternar}
              className="bg-[#f29100] data-[state=checked]:bg-[#004A8D]"
            />

            <span className="text-[#004A8D] dark:text-white font-semibold text-xl">
              Supervisão
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4 w-full mt-6">
            <Input
              placeholder="Login"
              value={user}
              onChange={(e) => setUser((e.target.value).toUpperCase())}
              className="border-2 border-[#004A8D] w-[380px] h-[40px] text-[#004A8D] dark:text-black dark:bg-white focus:ring focus:outline-none text-xl font-semibold"
            />
            <Input
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border-2 border-[#004A8D] w-[380px] h-[40px] text-[#004A8D] dark:text-black dark:bg-white focus:ring focus:outline-none text-xl font-semibold"
            />
          </div>

          <button
            onClick={handleLogin}
            className="mt-6 w-[380px] h-[40px] cursor-pointer text-white py-2 rounded bg-[#004A8D] shadow-md text-xl font-semibold uppercase transition-all duration-500 ease-in-out
                       hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                       active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
            Entrar
          </button>

          <Link
            href="/login2"
            className="mt-4 text-[#004A8D] dark:text-white font-sans text-xl w-[30s0px] h-[30px] text-center rounded hover:tracking-wide cursor-pointer"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
}
