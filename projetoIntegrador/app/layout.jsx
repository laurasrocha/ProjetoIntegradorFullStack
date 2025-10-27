import "./globals.css";
import { ToastProvider } from "./_components/ToastProvider";
import { cookies } from "next/headers";

export default async function ProjetosLayout({ children }) {
  // Só dentro do componente podemos chamar cookies()
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "dark";

  return (
    <html lang="pt-BR" className={theme === "dark" ? "dark" : ""}>
      <body className="w-screen overflow-x-hidden bg-slate-100 dark:bg-gray-950">
        {children}
        {/* Toaster global */}
        <ToastProvider />
      </body>
    </html>
  );
}
