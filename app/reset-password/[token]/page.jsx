"use client";

import { use, useState } from "react";
import { Input } from "@/components/ui/input";


export default function ResetPasswordPage({ params }) {

  const { token } = use(params);

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (novaSenha !== confirmSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    const res = await fetch("/api/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, novaSenha }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.error);
      return;
    }

    setMsg("Senha redefinida com sucesso! Agora você pode fazer login.");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10">
      <h2 className="text-[#004A8D] dark:text-white text-lg font-sans font-semibold sm:text-2xl mb-6 sm:mb-14">Redefinir Senha</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <form onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center">
        <div>
          <label>Nova senha:</label>
          <Input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            className="text-[#004A8D] dark:text-slate-200 border-2 border-[#004A8D] font-semibold text-sm w-[60vw] sm:w-[40vw] mt-1"
          />

          <label>Confirmar senha:</label>
          <Input
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
            className="text-[#004A8D] dark:text-slate-200 border-2 border-[#004A8D] font-semibold text-sm w-[60vw] sm:w-[40vw] mt-1"

          />
        </div>
        <button type="submit"
          className="w-[40vw] h-[40px] sm:w-[200px] mt-8 cursor-pointer text-white rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100"
        >
          Redefinir senha
        </button>
      </form>
    </div>
  );
}
