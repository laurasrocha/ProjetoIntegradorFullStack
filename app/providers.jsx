"use client";

import { ThemeProvider } from "next-themes";
// Foi necessário pois ao recarregar a página pelo reload do navegador, o modo escuro era ativado sozinho por alguns segundos

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}