import Link from "next/link"
import {
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaFileAlt,
} from "react-icons/fa"

export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-900 text-white mt-10">

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* LOGO / COPYRIGHT */}
        <div className="flex flex-col items-center md:items-start gap-2">

          <div className="flex items-center gap-2 text-xl font-bold">
            <FaFileAlt className="text-blue-400" />
            <span>Sistema de Currículos</span>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Todos os direitos reservados
          </p>

        </div>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">

          <Link
            href="#"
            className="hover:text-blue-400 transition"
          >
            Sobre
          </Link>

          <Link
            href="#"
            className="hover:text-blue-400 transition"
          >
            Contato
          </Link>

          <Link
            href="#"
            className="hover:text-blue-400 transition"
          >
            Privacidade
          </Link>

        </div>

        {/* REDES */}
        <div className="flex gap-4 text-xl">

          <Link
            href="#"
            className="hover:text-blue-400 transition"
          >
            <FaGithub />
          </Link>

          <Link
            href="#"
            className="hover:text-pink-400 transition"
          >
            <FaInstagram />
          </Link>

          <Link
            href="#"
            className="hover:text-green-400 transition"
          >
            <FaEnvelope />
          </Link>

        </div>

      </div>

    </footer>
  )
}