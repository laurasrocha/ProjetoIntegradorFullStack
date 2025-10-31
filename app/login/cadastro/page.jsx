// tela cadastro de usuário
"use client";
import React from "react";
import Header from "@/app/_components/header";
import ThemeSwitch from "../../_components/themeSwitch";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Cadastro() {
  const [nome_usuario, setNome] = useState("");
  const [email_usuario, setEmail] = useState("");
  const [senha_cripto, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [TipoUsuario, setTipoUser] = useState("");

  // Limpar campos
  function resetForm() {
    setNome("");
    setEmail("");
    setSenha("");
    setConfSenha("");
    setTipoUser("");
  }

  async function cadastrar() {
    // validação primeiro!
    if (
      !nome_usuario ||
      !email_usuario ||
      !senha_cripto ||
      !confSenha ||
      !TipoUsuario
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha_cripto !== confSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const dados = {
        nome_usuario,
        email_usuario,
        senha_cripto,
        TipoUsuario,
      };

      console.log("Enviando dados:", dados);
      await axios.post("/api/usuarios", dados);
      resetForm();
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar formulário");
    }
  }

  return (
    <div className="w-screen h-full bg-slate-100 dark:bg-gray-900">
      <Header
        btnDesktop={
          <Link
            href="/login"
            className="w-[140px] h-[40px] sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                            active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100 text-center flex items-center justify-center"
          >
            Tela Login
          </Link>
        }
        btnMobile={
          <Link
            href="/login"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            Tela Login
          </Link>
        }
        btnPjMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            Sair
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/"
            className="w-[160px] h-[40px] sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                            active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100 text-center flex items-center justify-center"
          >
            Sair
          </Link>
        }
      />
      <div className="flex w-full justify-end">
        <ThemeSwitch />
      </div>
      <div className="w-full flex justify-center items-center bg-slate-100 dark:bg-gray-900 mt-5">
        {/* card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-2xl w-[820px] flex flex-col border-t-4 border-[#004A8D] animate-fadeIn">
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-center mt-8">
              <h1 className="text-2xl font-bold tracking-wide drop-shadow-md text-[#004A8D] dark:text-white">
                CADASTRE SEU USUÁRIO
              </h1>
              <h1 className="mt-5 text-xs font-semibold tracking-wide drop-shadow-md text-gray-800 dark:text-white">
                Crie sua conta para acessar nossa plataforma
              </h1>
            </div>
            <div className="w-full h-[260px] flex">
              {/* divisória login nome e email */}
              <div className="w-[50vw] mt-5 flex flex-col items-center space-y-5 border border-gray-200 dark:border-gray-700 h-[240px] p-4">
                <Input
                  placeholder="Nome"
                  value={nome_usuario}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"
                />
                <Input
                  placeholder="Email"
                  value={email_usuario}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"
                />

                <Select value={TipoUsuario} onValueChange={setTipoUser}>
                  <SelectTrigger className="w-[350px] h-[43px] border-2 border-[#004A8D] font-semibold rounded-xl">
                    <SelectValue
                      placeholder="Tipo de Usuário"
                      className="text-[#004A8D] dark:text-white font-semibold"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selecione:</SelectLabel>
                      <SelectItem
                        value="DOCENTE"
                        className="text-[#004A8D] dark:text-slate-200 font-semibold"
                      >
                        Docente
                      </SelectItem>
                      <SelectItem
                        value="SUPERVISOR"
                        className="text-[#004A8D] dark:text-slate-200 font-semibold"
                      >
                        Supervisor
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[50vw] mt-5 flex flex-col items-center space-y-5 border border-gray-200 dark:border-gray-700 h-[240px] p-3">
                <Input
                  placeholder="Senha"
                  type="password"
                  value={senha_cripto}
                  onChange={(e) => setSenha(e.target.value)}
                  className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"
                />

                <Input
                  placeholder="Confirmar senha"
                  type="password"
                  value={confSenha}
                  onChange={(e) => setConfSenha(e.target.value)}
                  className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"
                />

                {/* divisória do botão */}
                <div className="w-full h-24 space-y-2">
                  <div className="w-full flex justify-center items-center space-x-3">
                    <span className="text-gray-300 dark:text-gray-700">
                      -----------
                    </span>
                    <h1 className="text-center text-gray-600 dark:text-gray-400 text-xs font-sans font-semibold">
                      FINALIZAR CADASTRO
                    </h1>
                    <span className="text-gray-300 dark:text-gray-700">
                      -----------
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={cadastrar}
                      className="w-[350px] h-[40px] hidden sm:block cursor-pointer text-white py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                        hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                        active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                        items-center justify-center text-center"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[110px] bg-slate-200 dark:bg-gray-800 rounded flex justify-center items-center">
            <Image
              src="/logosenac.png"
              alt="logo senac"
              width={120}
              height={120}
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
