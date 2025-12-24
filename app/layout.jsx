import "./globals.css";
import { ToastProvider } from "./_components/ToastProvider";
import { cookies } from "next/headers";
import { Poppins, Merriweather, Roboto, Roboto_Condensed } from "next/font/google";

export const metadata = {
  title: "Gestão de Projetos",
};

//usando fontes do next/font/google
//estão sendo chamadas no @theme:inline do global.css
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins"
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merri"
});

// Fonte principal — Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

// Fonte secundária — Roboto Condensed
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto-condensed",
});

export default async function ProjetosLayout({ children }) {
  // Só dentro do componente podemos chamar cookies()
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "dark";

  return (
    <html lang="pt-BR" className={`${theme === "dark" ? "dark" : ""} 
      ${poppins.variable} 
      ${merriweather.variable} 
      ${roboto.variable}
      ${robotoCondensed.variable}`}>

      <body className="w-screen h-screen overflow-x-hidden bg-slate-100 dark:bg-gray-900">
        {children}
        {/* Toaster global */}
        <ToastProvider />
      </body>
    </html>
  );
}
