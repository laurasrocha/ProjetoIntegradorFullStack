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
import { toast } from 'sonner';
import { MdError } from 'react-icons/md'; 

export default function FormDesk() {

    const [nome_usuario, setNome] = useState("");
    const [email_usuario, setEmail] = useState("");
    const [senha_cripto, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [tipo_usuario, setTipoUser] = useState("");

    // estados de erro
    const [errorNome, setErrorNome] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorSenha, setErrorSenha] = useState("");
    const [errorConfSenha, setErrorConfSenha] = useState("");


    // funcoes de validação simples
    function validarNome(nome) {
        if (nome.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
        if (nome.length > 50) return "O nome deve ter no máximo 50 caracteres.";
        return "";
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) return "Digite um email válido (ex: usuario@gmail.com).";
        return "";
    }

    function validarSenha(senha) {
        if (senha.length < 5) return "A senha deve ter no mínimo 5 caracteres.";
        if (senha.length > 10) return "A senha deve ter no máximo 10 caracteres.";
        return "";
    }

    function validarConfSenha(conf) {
    if (conf !== senha_cripto) return "As senhas não coincidem.";
    return "";
    }


    // Limpar campos
    function resetForm() {
        setNome("");
        setEmail("");
        setSenha("");
        setConfSenha("");
        setTipoUser("");

        setErrorNome("");
        setErrorEmail("");
        setErrorSenha("");
    }

    async function cadastrar() {

        // validação primeiro!
        if (
            !nome_usuario ||
            !email_usuario ||
            !senha_cripto ||
            !confSenha ||
            !tipo_usuario
        ) {
            toast.error("Preencha todos os campos obrigatórios!");
            return;
        }

        // se há erros exibidos nos inputs
        if (errorNome || errorEmail || errorSenha) {
            toast.error("Corrija os erros antes de enviar.");
            return;
        }

        if (senha_cripto !== confSenha) {
            toast.error("As senhas não coincidem!");
            return;
        }

        try {
            const dados = {
                nome_usuario,
                email_usuario,
                senha_cripto,
                tipo_usuario,
            };

            console.log("Enviando dados:", dados);
            await axios.post("/api/usuarios", dados);
            resetForm();
            toast.success("Usuário cadastrado com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao enviar formulário");
        }
    }

    return (
        <div className="hidden sm:block">

            <div className="w-full flex justify-center items-center bg-slate-100 dark:bg-gray-900 mt-5">
                {/* card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-2xl w-[820px] flex flex-col border-t-4 border-[#004A8D] animate-fadeIn">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex flex-col items-center justify-center mt-8">
                            <h1 className="text-2xl font-bold tracking-wide drop-shadow-md text-[#004A8D] dark:text-white">
                                CADASTRE SEU USUÁRIO
                            </h1>
                            <h1 className="mt-5 text-xs font-semibold tracking-wide drop-shadow-md text-gray-800 dark:text-white">
                                Crie sua conta para acessar nossa plataforma
                            </h1>
                        </div>
                        <div className="w-full h-[260px] flex">
                            {/* divisória login nome e email */}
                            <div className="w-[50vw] mt-5 flex flex-col items-center space-y-5 border border-gray-200 dark:border-gray-700 h-[240px] p-4">
                                
                                {/* input nome */}
                                <div className="flex flex-col">
                                    <Input
                                        placeholder="Nome"
                                        value={nome_usuario}
                                        onChange={(e) => {
                                            setNome(e.target.value);
                                            setErrorNome(validarNome(e.target.value));
                                        }}
                                        className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300"
                                        aria-invalid={errorNome ? "true" : "false"}
                                        aria-describedby="error-nome"
                                    />
                                    {/* Contêiner de altura fixa (h-4) e implementação ARIA/ícone */}
                                    <div className="h-2"> 
                                        {errorNome && (
                                            <p 
                                                id="error-nome"
                                                role="alert"
                                                className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                            >
                                                <MdError className="w-4 h-4" /> 
                                                <span>{errorNome}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* input email */}
                                <div className="flex flex-col">
                                    <Input
                                        placeholder="Email"
                                        value={email_usuario}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrorEmail(validarEmail(e.target.value));
                                        }}
                                        className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300"
                                        aria-invalid={errorEmail ? "true" : "false"}
                                        aria-describedby="error-email"
                                    />
                                    {/* Contêiner de altura fixa (h-4) e implementação ARIA/ícone */}
                                    <div className="h-2"> 
                                        {errorEmail && (
                                            <p 
                                                id="error-email"
                                                role="alert"
                                                className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                            >
                                                <MdError className="w-4 h-4" /> 
                                                <span>{errorEmail}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Select value={tipo_usuario} onValueChange={setTipoUser}>
                                    <SelectTrigger className="w-[350px] h-[43px] border-2 border-[#004A8D] font-semibold rounded-xl">
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
                                                className="text-[#004A8D] dark:text-slate-200 font-semibold"
                                            >
                                                Docente
                                            </SelectItem>
                                            <SelectItem
                                                value="SUPERVISOR"
                                                className="text-[#004A8D] dark:text-slate-200 font-semibold"
                                            >
                                                Supervisor
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-[50vw] mt-5 flex flex-col items-center space-y-5 border border-gray-200 dark:border-gray-700 h-[240px] p-3">

                                {/* input senha */}
                                <div className="flex flex-col">
                                    <Input
                                        placeholder="Senha"
                                        type="password"
                                        value={senha_cripto}
                                        onChange={(e) => {
                                            setSenha(e.target.value);
                                            setErrorSenha(validarSenha(e.target.value));
                                        }}
                                        className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300"
                                        aria-invalid={errorSenha ? "true" : "false"}
                                        aria-describedby="error-senha"
                                    />
                                    {/* Contêiner de altura fixa (h-4) e implementação ARIA/ícone */}
                                    <div className="h-2">
                                        {errorSenha && (
                                            <p 
                                                id="error-senha"
                                                role="alert"
                                                className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                            >
                                                <MdError className="w-4 h-4" /> 
                                                <span>{errorSenha}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* input confirmar senha */}
                                <div className="flex flex-col">
                                    <Input
                                        placeholder="Confirmar senha"
                                        type="password"
                                        value={confSenha}
                                        onChange={(e) => {
                                            setConfSenha(e.target.value);
                                            setErrorConfSenha(validarConfSenha(e.target.value));
                                        }}
                                        className="bg-slate-100 dark:bg-gray-800 border-2 border-[#004A8D] w-[350px] h-[43px] text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300"
                                        aria-invalid={errorConfSenha ? "true" : "false"}
                                        aria-describedby="error-conf-senha"
                                    />
                                    {/* Contêiner de altura fixa (h-4) e implementação ARIA/ícone */}
                                    <div className="h-2">
                                        {errorConfSenha && (
                                            <p 
                                                id="error-conf-senha"
                                                role="alert"
                                                className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                            >
                                                <MdError className="w-4 h-4" /> 
                                                <span>{errorConfSenha}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* divisória do botão */}
                                <div className="w-full h-24 space-y-2">
                                    <div className="w-full flex justify-center items-center space-x-3">
                                        <span className="text-gray-300 dark:text-gray-700">
                                            -----------
                                        </span>
                                        <h1 className="text-center text-gray-600 dark:text-gray-400 text-xs font-sans font-semibold">
                                            FINALIZAR CADASTRO
                                        </h1>
                                        <span className="text-gray-300 dark:text-gray-700">
                                            -----------
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={cadastrar}
                                            className="w-[350px] h-[40px] hidden sm:block cursor-pointer text-white py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                                                hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                                                active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                                                items-center justify-center text-center"
                                        >
                                            Cadastrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[110px] bg-slate-200 dark:bg-gray-800 rounded flex justify-center items-center">
                        <Image
                            src="/logosenac.png"
                            alt="logo senac"
                            width={120}
                            height={120}
                            className="drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}