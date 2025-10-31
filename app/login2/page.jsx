"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import Header from "../_components/header";
import Link from "next/link";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import ThemeSwitch from "../_components/themeSwitch";
import { toast } from "sonner";

export default function login2() {
  const sucesso = () => {
    toast.success("Enviamos no seu email");
  };

  return (
    <div className="w-screen h-screen bg-slate-100 dark:bg-gray-900">
      <Header
        btnDesktop={
          <Link
            href="/"
            className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                    hover:tracking-wide hover:bg-orange-400 hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                    items-center justify-center text-center"
          >
            Sair
          </Link>
        }
        btnMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                    hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                    active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            <HiMiniArrowRightStartOnRectangle className="w-[35px]" size={18} />
            Sair
          </Link>
        }
        btnPjMobile={
          <Link
            href="/projetos"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                        hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                        active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            VER PROJETOS{" "}
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

      <div className="w-full flex flex-col">
        <div className="w-full flex justify-end h-[40px] p-2">
          <ThemeSwitch />
        </div>
        <div className="w-full flex flex-col items-center space-y-10">
          <h1 className="text-[#004A8D] dark:text-white text-lg font-sans font-semibold sm:text-2xl mb-6 sm:mb-14">
            Recupere sua senha
          </h1>
          <div className="w-[80vw] h-full flex flex-col items-center">
            <div className="p-2">
              <h2 className="text-[#004A8D] dark:text-white text-xs font-sans font-semibold sm:text-lg flex text-start">
                Digite seu e-mail
              </h2>
              <Input className="text-[#004A8D] dark:text-slate-200 border-2 border-[#004A8D] font-semibold text-sm w-[60vw] sm:w-[40vw] mt-1" />
            </div>

            <div className="flex w-full justify-center">
              <button
                onClick={sucesso}
                className="w-[40vw] h-[40px] sm:w-[200px] mt-8 cursor-pointer text-white rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
