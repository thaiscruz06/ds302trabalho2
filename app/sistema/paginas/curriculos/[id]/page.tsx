"use client"

import { useState } from "react"
import {
  useForm,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form"
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
  FaPlus,
  FaTrash,
} from "react-icons/fa"

// 1. Definição do Tipo
type CurriculoFormData = {
  nome: string
  cargo: string
  email: string
  telefone: string
  cpf: string
  resumo: string
  experiencias: {
    descricao: string
  }[]
  formacoes: {
    descricao: string
  }[]
  habilidades: string
}

// 2. Schema de Validação (Corrigido para evitar o erro de 'undefined')
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
  experiencias: yup.array().of(
    yup.object({
      descricao: yup
        .string()
        .required("A experiência é obrigatória")
        .min(10, "Mínimo 10 caracteres"),
    })
  ).required().min(1, "Adicione pelo menos uma experiência"), // Garante que não seja undefined
  formacoes: yup.array().of(
    yup.object({
      descricao: yup
        .string()
        .required("A formação é obrigatória")
        .min(5, "Mínimo 5 caracteres"),
    })
  ).required().min(1, "Adicione pelo menos uma formação"), // Garante que não seja undefined
  habilidades: yup
    .string()
    .required("As habilidades são obrigatórias"),
}).required()

function gerarId() {
  return Date.now().toString()
}

export default function NovoCurriculo() {
  const [imagem, setImagem] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CurriculoFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      experiencias: [{ descricao: "" }],
      formacoes: [{ descricao: "" }],
    },
  })

  const {
    fields: experienciasFields,
    append: addExperiencia,
    remove: removeExperiencia,
  } = useFieldArray({
    control,
    name: "experiencias",
  })

  const {
    fields: formacoesFields,
    append: addFormacao,
    remove: removeFormacao,
  } = useFieldArray({
    control,
    name: "formacoes",
  })

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagem(url)
    }
  }

  function mascaraTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = e.target.value
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    e.target.value = valor
  }

  function mascaraCPF(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = e.target.value
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    e.target.value = valor
  }

  // 3. Submit Handler (Corrigido para CurriculoFormData)
  const onSubmit: SubmitHandler<CurriculoFormData> = (data) => {
    const curriculosSalvos = localStorage.getItem("curriculos")
    const curriculos = curriculosSalvos ? JSON.parse(curriculosSalvos) : []

    const novoCurriculo = {
      id: gerarId(),
      ...data,
      imagem: imagem || "/imagens/avatar.png",
    }

    curriculos.push(novoCurriculo)
    localStorage.setItem("curriculos", JSON.stringify(curriculos))

    toast.success("Currículo cadastrado!", {
      description: "Os dados foram salvos com sucesso.",
    })

    reset()
    setImagem(null)
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800">
          Cadastro de Currículo
        </h1>
        <p className="text-slate-500 mt-2">
          Preencha suas informações profissionais
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* FOTO */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FaImage className="text-pink-500" />
              Foto de Perfil
            </label>
            <input type="file" onChange={handleImagem} />
            {imagem && (
              <img
                src={imagem}
                alt="preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-100 shadow-lg"
              />
            )}
          </div>
        </div>

        {/* DADOS PESSOAIS */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaUser className="text-blue-600" /> Nome
              </label>
              <input
                {...register("nome")}
                className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
              />
              <p className="text-red-500 text-sm mt-1">{errors.nome?.message}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaBriefcase className="text-emerald-600" /> Cargo desejado
              </label>
              <input
                {...register("cargo")}
                className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
              />
              <p className="text-red-500 text-sm mt-1">{errors.cargo?.message}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaEnvelope className="text-red-500" /> E-mail
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaPhone className="text-green-600" /> Telefone
              </label>
              <input
                {...register("telefone")}
                onChange={(e) => {
                   mascaraTelefone(e);
                   register("telefone").onChange(e);
                }}
                maxLength={15}
                placeholder="(00) 00000-0000"
                className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
              />
              <p className="text-red-500 text-sm mt-1">{errors.telefone?.message}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaIdCard className="text-purple-600" /> CPF
              </label>
              <input
                {...register("cpf")}
                onChange={(e) => {
                  mascaraCPF(e);
                  register("cpf").onChange(e);
                }}
                maxLength={14}
                placeholder="000.000.000-00"
                className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
              />
              <p className="text-red-500 text-sm mt-1">{errors.cpf?.message}</p>
            </div>
          </div>
        </div>

        {/* RESUMO */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <label className="flex items-center gap-2 text-sm font-medium">
            <FaFileAlt className="text-orange-500" /> Resumo profissional
          </label>
          <textarea
            rows={4}
            {...register("resumo")}
            className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
          />
          <p className="text-red-500 text-sm mt-1">{errors.resumo?.message}</p>
        </div>

        {/* EXPERIÊNCIAS */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <FaBriefcase className="text-blue-600" /> Experiências Profissionais
            </h2>
            <button
              type="button"
              onClick={() => addExperiencia({ descricao: "" })}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              <FaPlus /> Adicionar
            </button>
          </div>
          <div className="space-y-4">
            {experienciasFields.map((field, index) => (
              <div key={field.id} className="border rounded-2xl p-4 bg-slate-50">
                <textarea
                  rows={3}
                  {...register(`experiencias.${index}.descricao`)}
                  className="w-full rounded-xl p-3 border"
                  placeholder="Descreva sua experiência..."
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.experiencias?.[index]?.descricao?.message}
                </p>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeExperiencia(index)}
                    className="mt-3 flex items-center gap-2 text-red-500"
                  >
                    <FaTrash /> Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FORMAÇÕES */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <FaGraduationCap className="text-purple-600" /> Formações Acadêmicas
            </h2>
            <button
              type="button"
              onClick={() => addFormacao({ descricao: "" })}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl"
            >
              <FaPlus /> Adicionar
            </button>
          </div>
          <div className="space-y-4">
            {formacoesFields.map((field, index) => (
              <div key={field.id} className="border rounded-2xl p-4 bg-slate-50">
                <textarea
                  rows={3}
                  {...register(`formacoes.${index}.descricao`)}
                  className="w-full rounded-xl p-3 border"
                  placeholder="Descreva sua formação..."
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.formacoes?.[index]?.descricao?.message}
                </p>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeFormacao(index)}
                    className="mt-3 flex items-center gap-2 text-red-500"
                  >
                    <FaTrash /> Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* HABILIDADES */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <label className="flex items-center gap-2 text-sm font-medium">
            <FaTools className="text-cyan-600" /> Habilidades
          </label>
          <textarea
            rows={4}
            {...register("habilidades")}
            className="w-full rounded-2xl p-3 mt-2 border bg-slate-50"
          />
          <p className="text-red-500 text-sm mt-1">{errors.habilidades?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.01] transition"
        >
          Salvar Currículo 🚀
        </button>
      </form>
    </div>
  )
}