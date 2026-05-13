"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav() {
  const pathname = usePathname()

  function ativo(path: string) {
    return pathname === path
      ? "text-yellow-300 font-bold"
      : "hover:text-yellow-200"
  }

  return (
    <nav className="flex gap-6 mt-4 md:mt-0">

      <Link href="/" className={ativo("/")}>
        Home
      </Link>

      <Link
        href="/sistema/paginas/curriculos"
        className={ativo("/sistema/paginas/curriculos")}
      >
        Currículos
      </Link>

      <Link
        href="/sistema/paginas/curriculos/novo"
        className={ativo("/sistema/paginas/curriculos/novo")}
      >
        Novo
      </Link>

    </nav>
  )
}