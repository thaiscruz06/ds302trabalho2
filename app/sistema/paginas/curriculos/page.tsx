"use client"

import Link from "next/link"
import { useState } from "react"
import { FaSearch, FaUserTie } from "react-icons/fa"

// DADOS MOCKADOS
const curriculosMock = [
  {
    id: "1",
    nome: "Ana Silva",
    cargo: "Desenvolvedora Front-end",
    resumo: "Experiência com React, Next.js e UI moderna.",
  },
  {
    id: "2",
    nome: "Carlos Souza",
    cargo: "Back-end",
    resumo: "Node.js, APIs REST e bancos de dados.",
  },
  {
    id: "3",
    nome: "Juliana Lima",
    cargo: "Designer UX/UI",
    resumo: "Foco em experiência do usuário e prototipagem.",
  },
]

export default function ListaCurriculos() {
  const [busca, setBusca] = useState("")

  const filtrados = curriculosMock.filter((c) =>
    `${c.nome} ${c.cargo}`.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Lista de Currículos
        </h1>
        <p className="text-gray-500">
          Visualize e gerencie candidatos cadastrados
        </p>
      </div>

      {/* BUSCA COM ÍCONE */}
      <div className="relative max-w-md mx-auto">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou cargo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* RESULTADO VAZIO */}
      {filtrados.length === 0 && (
        <p className="text-center text-gray-500">
          Nenhum currículo encontrado...
        </p>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {filtrados.map((curriculo) => (
          <Link
            key={curriculo.id}
            href={`/sistema/paginas/curriculos/${curriculo.id}`}
            className="border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all block bg-white"
          >
            {/* ÍCONE */}
            <FaUserTie className="text-3xl text-blue-600 mb-3" />

            <h2 className="font-semibold text-lg">
              {curriculo.nome}
            </h2>

            <p className="text-sm text-blue-600 font-medium">
              {curriculo.cargo}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {curriculo.resumo}
            </p>
          </Link>
        ))}

      </div>

    </div>
  )
}


