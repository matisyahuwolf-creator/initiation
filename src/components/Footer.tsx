export default function Footer() {
  return (
    <footer className="border-t border-[#e8e6df]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] leading-none text-[#0a0a0a]">○</span>
          <span className="font-display text-[16px] tracking-tight">
            Initiation
          </span>
        </div>
        <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
          free · open-source · for all humanity
        </p>
        <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
          est. 2026
        </p>
      </div>
    </footer>
  )
}
