import Link from "next/link"
import { FaRocket, FaFolderOpen, FaUserCheck } from "react-icons/fa"

export default function Home() {
  return (
    <div className="flex flex-col gap-16">

      {/* HERO */}
      <section className="text-center space-y-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Gerencie Currículos <span className="text-blue-600">com Facilidade</span>
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Organize, visualize e cadastre currículos de forma rápida,
          moderna e eficiente.
        </p>

        <Link href="/sistema/paginas/curriculos">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg">
            Começar agora 🚀
          </button>
        </Link>
      </section>

      {/* BENEFÍCIOS */}
      <section className="grid md:grid-cols-3 gap-8">

        {/* CARD 1 */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition text-center">
          <FaFolderOpen className="text-3xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Organização</h2>
          <p className="text-gray-500">
            Gerencie todos os currículos em um só lugar.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition text-center">
          <FaRocket className="text-3xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Praticidade</h2>
          <p className="text-gray-500">
            Cadastro rápido com validação inteligente.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition text-center">
          <FaUserCheck className="text-3xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Visual Moderno</h2>
          <p className="text-gray-500">
            Interface limpa e responsiva.
          </p>
        </div>

      </section>

    </div>
  )
}