"use client";
import Header from "./_components/header";
import CarouselFunction from "./_components/carousel";
import Texto from "./_components/texto";
import Link from "next/link"
import Footer from "./_components/footer";
import ThemeSwitch from './_components/themeSwitch';

export default function Home() {

  return (

    <div className="w-screen h-screen flex flex-col bg-slate-100 dark:bg-gray-900">
      {/* desktop */}
      <Header btnDesktop={
        <Link href="/login"
          className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                    hover:tracking-wide hover:bg-orange-400 hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                     items-center justify-center text-center">
          LOGIN
        </Link>
      }
        // mobile sheet
        btnMobile={
          <Link href="/login"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center">LOGIN</Link>
        }
        //mobile (projetos)
        btnPjMobile={
          <Link href="/projetos"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
              hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
              active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center">
            VER PROJETOS </Link>
        }
        //desktop (projetos)
        btnPjDesktop={
          <Link href="/projetos"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
           hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
          active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >VER PROJETOS</Link>
        } />
      <div className='w-full flex justify-end p-4'>
        {/* Botão para alternar tema */}
        <ThemeSwitch />
      </div>
      <div className="w-full h-full bg-slate-100 dark:bg-gray-900">
        <div className="bg-slate-100 dark:bg-gray-900 space-y-12">
          <CarouselFunction />
          <Texto />
        </div>
        <Footer />
      </div>
    </div>
  );
}
