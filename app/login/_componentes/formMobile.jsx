import React from 'react';
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";


export default function FormMobile() {

    const [nome_usuario, setNome] = useState("");
    const [email_usuario, setEmail] = useState("");
    const [senha_cripto, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [TipoUsuario, setTipoUser] = useState("");

    // Limpar campos
    function resetForm() {
        setNome("");
        setEmail("");
        setSenha("");
        setConfSenha("");
        setTipoUser("");
    }

    async function cadastrar() {
        // validação primeiro!
        if (
            !nome_usuario ||
            !email_usuario ||
            !senha_cripto ||
            !confSenha ||
            !TipoUsuario
        ) {
            alert("Preencha todos os campos!");
            return;
        }

        if (senha_cripto !== confSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const dados = {
                nome_usuario,
                email_usuario,
                senha_cripto,
                TipoUsuario,
            };

            console.log("Enviando dados:", dados);
            await axios.post("/api/usuarios", dados);
            resetForm();
            alert("Usuário cadastrado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao enviar formulário");
        }
    }

    return (
        <div className="block sm:hidden">

            <div className="w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-gray-900">
                {/* card */}

                <div className="w-full flex flex-col items-center justify-center mt-5">
                    <h1 className="text-lg font-bold tracking-wide drop-shadow-md text-[#004A8D] dark:text-white">
                        CADASTRE SEU USUÁRIO
                    </h1>
                    <h1 className="mt-3 text-xs font-semibold tracking-wide drop-shadow-md text-gray-800 dark:text-white">
                        Crie sua conta para acessar nossa plataforma
                    </h1>
                </div>
                {/* div das inputs*/}

                <div className="w-full h-full flex flex-col items-center justify-center space-y-3 mt-12">
                    <Input
                        placeholder="Nome"
                        value={nome_usuario}
                        onChange={(e) => setNome(e.target.value)}
                        className="border-2 border-[#004A8D] w-[90vw] h-[35px] text-sm text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"

                    />
                    <Input
                        placeholder="Email"
                        value={email_usuario}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-[#004A8D] w-[90vw] h-[35px] text-sm text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"

                    />

                    <Select value={TipoUsuario} onValueChange={setTipoUser}>
                        <SelectTrigger className="w-[90vw] h-[35px] border-2 border-[#004A8D] text-sm font-semibold rounded-xl">
                            <SelectValue
                                placeholder="Tipo de Usuário"
                                className="text-[#004A8D] dark:text-white font-semibold"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Selecione:</SelectLabel>
                                <SelectItem
                                    value="DOCENTE"
                                    className="text-[#004A8D] dark:text-slate-200 font-semibold text-sm"
                                >
                                    Docente
                                </SelectItem>
                                <SelectItem
                                    value="SUPERVISOR"
                                    className="text-[#004A8D] dark:text-slate-200 font-semibold text-sm"
                                >
                                    Supervisor
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Senha"
                        type="password"
                        value={senha_cripto}
                        onChange={(e) => setSenha(e.target.value)}
                        className="border-2 border-[#004A8D] w-[90vw] h-[35px] text-sm text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"

                    />

                    <Input
                        placeholder="Confirmar senha"
                        type="password"
                        value={confSenha}
                        onChange={(e) => setConfSenha(e.target.value)}
                        className="border-2 border-[#004A8D] w-[90vw] h-[35px] text-sm text-[#121212] font-semibold dark:text-white dark:border-[#004A8D] rounded-xl shadow-sm transition-all duration-300"

                    />

                    {/* divisória do botão */}
                    <div className="w-full h-24 space-y-2 mt-2">
                        <div className="w-full flex justify-center items-center space-x-3">
                            <span className="text-gray-300 dark:text-gray-700">
                                -----------
                            </span>
                            <h1 className="text-center text-gray-600 dark:text-gray-500 text-xs font-sans font-semibold">
                                FINALIZAR CADASTRO
                            </h1>
                            <span className="text-gray-300 dark:text-gray-700">
                                -----------
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={cadastrar}
                                className="w-[150px] h-[35px] sm:w-[200px] sm:h-[40px] cursor-pointer text-center text-white py-2 sm:py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 mt-4"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>


                <div className="w-full h-[90px] flex justify-center items-end p-2">
                    <Image
                        src="/logosenac.png"
                        alt="logo senac"
                        width={80}
                        height={120}
                        className="drop-shadow-2xl"
                    />
                </div>
            </div>

        </div>
    )
}
