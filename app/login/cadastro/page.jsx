// tela cadastro de usuário
"use client";
import React from "react";
import Header from "@/app/_components/header";
import ThemeSwitch from "../../_components/themeSwitch";
import Link from "next/link";
import FormDesk from "../_componentes/formDesk";
import FormMobile from "../_componentes/formMobile";

export default function Cadastro() {

  return (
    <div className="w-screen h-full bg-slate-100 dark:bg-gray-900">
      <Header
        btnDesktop={
          <Link
            href="/"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
                     hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
            TELA INICIAL
          </Link>
        }
        btnMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            TELA INICIAL
          </Link>
        }
        btnPjMobile={
          <Link
            href="/login"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            TELA LOGIN
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/login"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
                     hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
            TELA LOGIN
          </Link>
        }
      />
      <div className="flex w-full justify-end">
        <ThemeSwitch />
      </div>
      <div className="">
        <FormDesk />
        <FormMobile />
      </div>
    </div>
  );
}
