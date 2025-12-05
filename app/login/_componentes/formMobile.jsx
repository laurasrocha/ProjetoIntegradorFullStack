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


export default function FormMobile() {


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
        if (confSenha !== senha_cripto) return "As senhas não coincidem.";
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
        setErrorConfSenha("");
    }

    async function cadastrar() {

        // Validar todos os campos novamente antes do envio
        const nomeErro = validarNome(nome_usuario);
        const emailErro = validarEmail(email_usuario);
        const senhaErro = validarSenha(senha_cripto);
        const confErro = validarConfSenha(confSenha);
        
        setErrorNome(nomeErro);
        setErrorEmail(emailErro);
        setErrorSenha(senhaErro);
        setErrorConfSenha(confErro);

        // Checagem de preenchimento obrigatório e erros de validação
        if (
            !nome_usuario || !email_usuario || !senha_cripto || !confSenha || !tipo_usuario
        ) {
            toast.error("Preencha todos os campos obrigatórios!");
            return;
        }

        if (nomeErro || emailErro || senhaErro || confErro) {
            toast.error("Corrija os erros de validação antes de enviar.");
            return;
        }
        
        // Se a validação passou, tenta cadastrar
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

                <div className="w-full h-full flex flex-col items-center justify-center space-y-1 mt-12">
                    
                    {/* Input Nome */}
                    <div className="w-[90vw] flex flex-col">
                        <Input
                            placeholder="Nome"
                            value={nome_usuario}
                            onChange={(e) => {
                                setNome(e.target.value);
                                setErrorNome(validarNome(e.target.value));
                            }}
                            className={`border-2 ${errorNome ? 'border-red-500' : 'border-[#004A8D]'} w-full h-[35px] text-sm text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300`}
                            aria-invalid={errorNome ? "true" : "false"}
                            aria-describedby="error-mobile-nome"
                        />
                        <div className="h-6 w-full"> 
                            {errorNome && (
                                <p 
                                    id="error-mobile-nome"
                                    role="alert"
                                    className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                >
                                    <MdError className="w-3 h-3 min-w-3 min-h-3" /> 
                                    <span>{errorNome}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Input Email */}
                    <div className="w-[90vw] flex flex-col">
                        <Input
                            placeholder="Email"
                            value={email_usuario}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorEmail(validarEmail(e.target.value));
                            }}
                            className={`border-2 ${errorEmail ? 'border-red-500' : 'border-[#004A8D]'} w-full h-[35px] text-sm text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300`}
                            aria-invalid={errorEmail ? "true" : "false"}
                            aria-describedby="error-mobile-email"
                        />
                        <div className="h-6 w-full">
                            {errorEmail && (
                                <p 
                                    id="error-mobile-email"
                                    role="alert"
                                    className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                >
                                    <MdError className="w-3 h-3 min-w-3 min-h-3" /> 
                                    <span>{errorEmail}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Select Tipo de Usuário (Mantido) */}
                    <Select value={tipo_usuario} onValueChange={setTipoUser}>
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
                    
                    {/* Adicionado espaçamento extra após o Select para o próximo campo */}
                    <div className="h-6 w-full"></div> 

                    {/* Input Senha */}
                    <div className="w-[90vw] flex flex-col">
                        <Input
                            placeholder="Senha"
                            type="password"
                            value={senha_cripto}
                            onChange={(e) => {
                                setSenha(e.target.value);
                                setErrorSenha(validarSenha(e.target.value));
                            }}
                            className={`border-2 ${errorSenha ? 'border-red-500' : 'border-[#004A8D]'} w-full h-[35px] text-sm text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300`}
                            aria-invalid={errorSenha ? "true" : "false"}
                            aria-describedby="error-mobile-senha"
                        />
                        <div className="h-6 w-full">
                            {errorSenha && (
                                <p 
                                    id="error-mobile-senha"
                                    role="alert"
                                    className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                >
                                    <MdError className="w-3 h-3 min-w-3 min-h-3" /> 
                                    <span>{errorSenha}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Input Confirmar Senha */}
                    <div className="w-[90vw] flex flex-col">
                        <Input
                            placeholder="Confirmar senha"
                            type="password"
                            value={confSenha}
                            onChange={(e) => {
                                setConfSenha(e.target.value);
                                setErrorConfSenha(validarConfSenha(e.target.value));
                            }}
                            className={`border-2 ${errorConfSenha ? 'border-red-500' : 'border-[#004A8D]'} w-full h-[35px] text-sm text-[#121212] font-semibold dark:text-white rounded-xl shadow-sm transition-all duration-300`}
                            aria-invalid={errorConfSenha ? "true" : "false"}
                            aria-describedby="error-mobile-confsenha"
                        />
                        <div className="h-4 w-full">
                            {errorConfSenha && (
                                <p 
                                    id="error-mobile-confsenha"
                                    role="alert"
                                    className="text-red-500 text-xs font-semibold mt-1 flex items-center space-x-1"
                                >
                                    <MdError className="w-3 h-3 min-w-3 min-h-3" /> 
                                    <span>{errorConfSenha}</span>
                                </p>
                            )}
                        </div>
                    </div>


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