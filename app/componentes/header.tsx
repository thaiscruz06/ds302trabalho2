import Nav  from "./nav"

export function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-lg font-bold">
          Sistema de Currículos
        </h1>

        <Nav />
      </div>
    </header>
  )
}