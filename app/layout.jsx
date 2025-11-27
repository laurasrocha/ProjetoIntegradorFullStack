import "./globals.css";
import { ToastProvider } from "./_components/ToastProvider";
import { Providers } from "./providers"; // Importe o arquivo criado

export const metadata = {
  title: "Meu App PWA",
  description: "Aplicativo PWA com Next.js App Router",
  manifest: "/manifest.json",
  icons: {
    icon: "/senac-192x192.png",
    apple: "/senac-512x512.png",
  },
};

export default function ProjetosLayout({ children }) {
  return (
    // ADICIONE suppressHydrationWarning (Essencial para evitar erro no console)
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="w-screen h-screen overflow-x-hidden bg-slate-100 dark:bg-gray-900">
        {/* Envolva o conteúdo com o Providers */}
        <Providers>
            {children}
            <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}