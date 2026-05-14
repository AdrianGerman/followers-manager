import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7c3aed22,transparent_40%),radial-gradient(circle_at_bottom_right,#f9731622,transparent_40%)]" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />

      <section className="relative w-full max-w-2xl flex flex-col items-center gap-8 text-center">
        <p className="text-[160px] font-black leading-none tracking-tighter bg-linear-to-b from-zinc-600 to-zinc-800 bg-clip-text text-transparent select-none">
          404
        </p>

        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-violet-900/20">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FndmQ3NjhpMXNzanBwZDNiajhreHV2Y245OWJyZG1pbmdiYXhpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2UCt7zbmsLoCXybx6t/giphy.gif"
            alt="This is fine"
            className="w-full object-cover"
            onError={(e) => {
              e.target.replaceWith(
                Object.assign(document.createElement("div"), {
                  className: "h-48 flex items-center justify-center text-7xl",
                  textContent: "🔥",
                }),
              )
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Ups.{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
              This is fine.
            </span>
          </h1>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
            La página que buscas no existe, se movió, o decidió tomarse un café
            mientras todo arde a su alrededor.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          ← Volver al inicio
        </button>
      </section>
    </div>
  )
}
