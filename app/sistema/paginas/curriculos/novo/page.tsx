"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"

import {
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaFileAlt,
  FaTools,
  FaGraduationCap,
  FaImage,
} from "react-icons/fa"

type FormData = {
  nome: string
  cargo: string
  email: string
  telefone: string
  cpf: string
  resumo: string
  experiencias: string
  formacoes: string
  habilidades: string
}

const schema = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter no mínimo 3 caracteres"),

  cargo: yup
    .string()
    .required("O cargo é obrigatório"),

  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("O e-mail é obrigatório"),

  telefone: yup
    .string()
    .required("O telefone é obrigatório"),

  cpf: yup
    .string()
    .required("O CPF é obrigatório"),

  resumo: yup
    .string()
    .required("O resumo é obrigatório")
    .min(10, "Resumo deve ter no mínimo 10 caracteres"),

  experiencias: yup
    .string()
    .required("As experiências são obrigatórias"),

  formacoes: yup
    .string()
    .required("As formações são obrigatórias"),

  habilidades: yup
    .string()
    .required("As habilidades são obrigatórias"),
})

function gerarId() {
  return Date.now().toString()
}

export default function NovoCurriculo() {

  const [imagem, setImagem] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  function handleImagem(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (file) {
      const url = URL.createObjectURL(file)
      setImagem(url)
    }
  }

  // MÁSCARA TELEFONE
  function mascaraTelefone(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    let valor = e.target.value

    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")

    e.target.value = valor
  }

  // MÁSCARA CPF
  function mascaraCPF(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    let valor = e.target.value

    valor = valor.replace(/\D/g, "")

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    e.target.value = valor
  }

  function onSubmit(data: FormData) {

    const curriculosSalvos =
      localStorage.getItem("curriculos")

    const curriculos = curriculosSalvos
      ? JSON.parse(curriculosSalvos)
      : []

    const novoCurriculo = {
      id: gerarId(),
      ...data,
      imagem: "/imagens/avatar.png",
    }

    curriculos.push(novoCurriculo)

    localStorage.setItem(
      "curriculos",
      JSON.stringify(curriculos)
    )

    toast.success("Currículo cadastrado!", {
      description: "Os dados foram salvos com sucesso.",
    })

    reset()
    setImagem(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* CARD PRINCIPAL */}
      <div className="bg-white border border-blue-100 shadow-xl rounded-3xl p-8 md:p-10">

        {/* TÍTULO */}
        <div className="text-center mb-10">

          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <FaUser className="text-3xl" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Cadastro de Currículo
          </h1>

          <p className="text-gray-500 mt-2">
            Preencha suas informações profissionais
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >

          {/* FOTO */}
          <div className="flex flex-col items-center gap-4">

            <label className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <FaImage />
              Foto de Perfil
            </label>

            <input
              type="file"
              onChange={handleImagem}
              className="text-sm"
            />

            {imagem && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagem}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-lg"
                />
              </>
            )}

          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* NOME */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaUser className="text-blue-500" />
                Nome
              </label>

              <input
                {...register("nome")}
                className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.nome
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.nome?.message}
              </p>

            </div>

            {/* CARGO */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaBriefcase className="text-indigo-500" />
                Cargo desejado
              </label>

              <input
                {...register("cargo")}
                className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.cargo
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.cargo?.message}
              </p>

            </div>

            {/* EMAIL */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaEnvelope className="text-cyan-500" />
                E-mail
              </label>

              <input
                type="email"
                {...register("email")}
                className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>

            </div>

            {/* TELEFONE */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaPhone className="text-green-500" />
                Telefone
              </label>

              <input
                {...register("telefone")}
                onChange={mascaraTelefone}
                maxLength={15}
                placeholder="(00) 00000-0000"
                className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.telefone
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.telefone?.message}
              </p>

            </div>

            {/* CPF */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaIdCard className="text-orange-500" />
                CPF
              </label>

              <input
                {...register("cpf")}
                onChange={mascaraCPF}
                maxLength={14}
                placeholder="000.000.000-00"
                className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.cpf
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.cpf?.message}
              </p>

            </div>

          </div>

          {/* RESUMO */}
          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaFileAlt className="text-pink-500" />
              Resumo profissional
            </label>

            <textarea
              rows={4}
              {...register("resumo")}
              className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.resumo
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.resumo?.message}
            </p>

          </div>

          {/* EXPERIÊNCIAS */}
          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaBriefcase className="text-violet-500" />
              Experiências profissionais
            </label>

            <textarea
              rows={4}
              {...register("experiencias")}
              className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.experiencias
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.experiencias?.message}
            </p>

          </div>

          {/* FORMAÇÕES */}
          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaGraduationCap className="text-yellow-500" />
              Formações acadêmicas
            </label>

            <textarea
              rows={4}
              {...register("formacoes")}
              className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.formacoes
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.formacoes?.message}
            </p>

          </div>

          {/* HABILIDADES */}
          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaTools className="text-red-500" />
              Habilidades
            </label>

            <textarea
              rows={4}
              {...register("habilidades")}
              className={`w-full rounded-2xl p-4 mt-2 border bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.habilidades
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.habilidades?.message}
            </p>

          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-2xl hover:scale-[1.01] hover:shadow-xl transition-all duration-300 font-semibold text-lg"
          >
            Salvar Currículo 🚀
          </button>

        </form>

      </div>

    </div>
  )
}