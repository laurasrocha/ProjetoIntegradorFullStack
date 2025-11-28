import { Link } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { IoLogoFacebook } from "react-icons/io5";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";


export default function Footer() {
  return (
    <div className="w-screen flex flex-col bg-slate-100 dark:bg-gray-900">
      <div className="bg-slate-200 h-18 flex justify-center items-center dark:bg-gray-700 relative bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-700 p-2">
        <label className="font-roboto-condensed text-sm sm:text-xl text-center text-gray-700 dark:text-white">
          Central de Relacionamento: 0800 724 44 40 (Minas Gerais)
          <br />
          31 3057-86600 (Demais Estados)
        </label>
      </div>
      <div className="bg-[#f29100] h-[3px] w-full"></div>

      <div className="bg-[#004A8D] h-[30vh] w-full justify-evenly items-center hidden sm:flex dark:bg-gray-900">
        <div className="h-[200px] w-[200px] flex flex-col items-center gap-3 mt-10">
          <a
            href="https://www.mg.senac.br/Paginas/default.aspx"
            target="_blank" /*abre o link em outra aba */
            rel="noopener noreferrer" /*pratica de segurança */
            className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#f29100] after:transition-all after:duration-300 hover:after:w-full
                    font-bold font-roboto text-xl"
          >
            Senac MG
          </a>

          <div className="flex flex-col text-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:underline text-white">
                O Senac
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <a
                  href="https://www.mg.senac.br/paginas/osenac.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuLabel>O Senac</DropdownMenuLabel>
                </a>
                <DropdownMenuSeparator />
                <a
                  href="https://www.mg.senac.br/Paginas/osenac.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Quem Somos</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/Unidades/Paginas/default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Unidades</DropdownMenuItem>
                </a>
                <a
                  href="https://transparencia.senac.br/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Transparência</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/Paginas/rededecarreiras.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Rede de Carreiras</DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="https://www.mg.senac.br/Noticias/Paginas/Noticias.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Notícias
            </a>

            <a
              href="https://www.mg.senac.br/Eventos/Paginas/eventos.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Eventos
            </a>

            <a
              href="https://www.mg.senac.br/Paginas/faleconosco.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Contato
            </a>
          </div>
        </div>

        <div className=" h-[200px] w-[200px]  flex flex-col justify-center items-center gap-3">
          <a
            href="https://www.mg.senac.br/Paginas/default.aspx"
            target="_blank" /*abre o link em outra aba */
            rel="noopener noreferrer" /*pratica de segurança */
            className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#f29100] after:transition-all after:duration-300 hover:after:w-full
                    font-bold font-roboto  text-xl"
          >
            Para Você
          </a>

          <div className="flex flex-col text-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:underline text-white">
                Cursos
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <a
                  href="https://www.mg.senac.br/Paginas/default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuLabel>Cursos</DropdownMenuLabel>
                </a>
                <DropdownMenuSeparator />
                <a
                  href="https://www.mg.senac.br/paginas/cursos-tecnicos.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Cursos Técnicos</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/paginas/graduacao.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Graduação</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/paginas/mba.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>MBA</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/Paginas/Cursos.aspx?tp=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Cursos Livres</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/Paginas/Cursos.aspx?tp=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Palestras e Workshops</DropdownMenuItem>
                </a>
                <a
                  href="https://www.mg.senac.br/Paginas/jovemaprendiz.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic"
                >
                  <DropdownMenuItem>Jovem Aprendiz</DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="https://www.mg.senac.br/programasenacdegratuidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Programa Senac <br /> de Gratuidade
            </a>

            <a
              href="https://www.mg.senac.br/Faculdade/Paginas/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Faculdade Senac
            </a>

            <a
              href="https://trabalheconoscosenacmg.gupy.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Trabalhe Conosco
            </a>
          </div>
        </div>

        <div className=" h-[200px] w-[200px] flex flex-col justify-center items-center gap-3">
          <a
            href="https://www.mg.senac.br/Paginas/default.aspx"
            target="_blank" /*abre o link em outra aba */
            rel="noopener noreferrer" /*pratica de segurança */
            className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#f29100] after:transition-all after:duration-300 hover:after:w-full
                        font-bold font-roboto text-xl"
          >
            Para Empresas
          </a>

          <div className="flex flex-col text-center">
            <a
              href="https://www.mg.senac.br/Paginas/solucoescorporativas.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Soluções Corporativas
            </a>

            <a
              href="https://www.mg.senac.br/Paginas/aprendizagem-comercial.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Programa de Aprendizagem <br /> Profissional Comercial
            </a>

            <a
              href="https://mg.senac.br/Paginas/senacmovel.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Senac Móvel
            </a>

            <a
              href="https://mg.senac.br/Paginas/rededecarreirasempresa.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Rede de Carreiras
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#05589d] w-full h-20 flex flex-col sm:flex-row justify-center items-center gap-y-2 sm:gap-x-2 relative bg-gradient-to-r dark:bg-gray-700 dark:from-gray-800 dark:via-gray-700 dark:to-gray-700">
        <FaLocationDot size={25} color="white"  className=""/>
        <a className="text-white text-center font-roboto-condensed text-xs sm:text-xl">
          Senac MG - Rua dos Tupinambás, 1.086 - Belo Horizonte / MG
        </a>
      </div>

      <div className="bg-[#004A8D] w-full h-48 flex flex-col justify-center items-center gap-5 dark:bg-gray-900">
        <div className="flex justify-start items-center">
          <Image
            src="/logosenacbranco.png"
            alt="logo senac"
            width={100}
            height={100}
          />
        </div>

        <a className="text-white font-roboto-condensed text-center">
          Senac MG © Todos os Direitos Reservados
        </a>

        <div className="flex justify-center items-center gap-3">
          <a
            href="https://www.facebook.com/senacminas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2  dark:bg-gray-600 dark:text-white dark:hover:bg-[#f29100] bg-slate-50 text-[#004A8D] rounded-md hover:bg-[#f29100] transition-all cursor-pointer"
          >
            <IoLogoFacebook size={25} />
          </a>

          <button
            href="https://x.com/senacminas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2  dark:bg-gray-600 dark:text-white dark:hover:bg-[#f29100] bg-slate-50 text-[#004A8D] rounded-md hover:bg-[#f29100] transition-all cursor-pointer"
          >
            <FaTwitter size={25} />
          </button>

          <a
            href="https://www.youtube.com/user/SenacMinasOficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2  dark:bg-gray-600 dark:text-white dark:hover:bg-[#f29100] bg-slate-50 text-[#004A8D] rounded-md hover:bg-[#f29100] transition-all cursor-pointer"
          >
            <FaYoutube size={25} />
          </a>

          <a
            href="https://www.linkedin.com/school/senacminas/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2  dark:bg-gray-600 dark:text-white dark:hover:bg-[#f29100] bg-slate-50 text-[#004A8D] rounded-md hover:bg-[#f29100] transition-all cursor-pointer"
          >
            <FaLinkedin size={25} />
          </a>

          <a
            href="https://www.instagram.com/senacminas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 dark:bg-gray-600 dark:text-white dark:hover:bg-[#f29100] bg-slate-50 text-[#004A8D] rounded-md hover:bg-[#f29100] transition-all cursor-pointer"
          >
            <FaInstagram size={25} />
          </a>
        </div>
      </div>
    </div>
  );
}
