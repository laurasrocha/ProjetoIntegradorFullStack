// CloseButton.jsx
// analisar arquivo para checar sua funcionalidade
"use client";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute
                top-0 right-0
                text-3xl /* Aumenta o tamanho do 'X' */
                font-extrabold /* Deixa ele mais cheio */
                text-gray-600 /* Cor mais escura para contraste */
                hover:text-gray-900 /* Mantém o hover */
                /* Deixa o fundo redondo ao hover */
                transition-colors duration-200 /* Adiciona uma transição suave */
                dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                aria-label="Fechar">
      &times;
    </button>
  );
}
