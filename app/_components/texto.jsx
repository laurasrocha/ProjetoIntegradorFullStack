import React from "react";
import { HiOutlineLightBulb, HiOutlineClipboardList } from "react-icons/hi";
import { motion } from "framer-motion";

export default function Texto() {
  return (
    <div className="w-full min-h-[600px] dark:bg-gray-900 bg-slate-100 py-20 flex justify-center">
      <div className="w-[90vw] sm:w-[800px] flex flex-col gap-10">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r bg-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-700 p-8 sm:p-10 rounded-3xl shadow-lg border-l-4 border-[#f29100] overflow-hidden hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineLightBulb className="text-[#f29100] w-8 h-8 animate-bounce" />
            <h2 className="font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
              O que é Projeto Integrador do Senac?
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-200 sm:text-lg leading-relaxed italic">
            O Projeto Integrador é uma atividade prática desenvolvida ao longo
            do curso técnico do SENAC (Serviço Nacional de Aprendizagem
            Comercial). Ele tem como objetivo unir teoria e prática, permitindo
            que os alunos apliquem os conhecimentos adquiridos em sala de aula
            para resolver problemas reais ou desenvolver soluções criativas.
          </p>
          {/* Linha inferior animada */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#f29100] animate-[progress_3s_linear_forwards] rounded-full"></div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-r bg-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-700 p-8 sm:p-10 rounded-3xl shadow-lg border-l-4 border-[#f29100] overflow-hidden hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineClipboardList className="text-[#f29100] w-8 h-8 animate-pulse" />
            <h2 className="font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
              Para que serve?
            </h2>
          </div>
          <ul className="text-gray-700 dark:text-gray-200 sm:text-lg leading-relaxed list-disc list-inside space-y-2 italic">
            <li>
              Aplicar na prática o conteúdo aprendido durante o curso (técnico ou profissionalizante);
            </li>
            <li>Estimular o trabalho em equipe e a comunicação entre os alunos;</li>
            <li>
              Desenvolver projetos reais ou simulados, muitas vezes voltados a empresas, ONGs, startups ou demandas da comunidade;
            </li>
            <li>Incentivar o uso de metodologias ágeis, ferramentas tecnológicas e boas práticas de mercado;</li>
            <li>
              Preparar os alunos para o mercado de trabalho, com foco em planejamento, execução e apresentação de resultados.
            </li>
          </ul>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#f29100] animate-[progress_3s_linear_forwards] rounded-full"></div>
        </motion.div>
      </div>

      {/* Animação da barra de progresso inline */}
      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-[progress_3s_linear_forwards] {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
}
