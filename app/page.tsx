import { connection } from "next/server";
import { CircleDollarSign, Sparkles } from "lucide-react";
import { SummaryCards } from "@/components/SummaryCards";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { getSummary, getTransactions } from "@/lib/transactions";

export default async function Home() {
  // Os dados vêm do banco a cada requisição (renderização dinâmica).
  await connection();

  const [summary, transactions] = await Promise.all([getSummary(), getTransactions()]);
  const now = new Date();
  const today = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(now);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeZone: "America/Sao_Paulo",
  }).format(now);
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Top Navbar / Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">
              <CircleDollarSign className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white">
                  Finanças Pessoais
                </h1>
                <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-500/20 sm:inline-flex dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Sparkles className="size-2.5" />
                  Ativo
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gestão simplificada e inteligente
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {capitalizedDate}
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Cards de Resumo */}
        <SummaryCards summary={summary} />

        {/* Grade: Formulário + Lista */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <TransactionForm today={today} />
          </div>
          <div className="lg:col-span-7">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}
