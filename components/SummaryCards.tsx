import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Summary } from "@/lib/types";

export function SummaryCards({ summary }: { summary: Summary }) {
  const negative = summary.balance < 0;

  return (
    <section aria-label="Resumo Financeiro" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Card de Saldo */}
      <div
        className={`relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-200 hover:shadow-md ${
          negative
            ? "bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 text-white border border-rose-800/50"
            : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white border border-slate-800 dark:border-slate-800/80"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Saldo Atual
          </span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
            <Wallet className="size-4" />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
            {formatCurrency(summary.balance)}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-300">
            {negative ? (
              <>
                <TrendingDown className="size-3.5 text-rose-400" />
                <span className="text-rose-300 font-medium">Atenção ao saldo negativo</span>
              </>
            ) : (
              <>
                <TrendingUp className="size-3.5 text-emerald-400" />
                <span className="text-slate-300">Balanço líquido acumulado</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card de Receitas */}
      <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Receitas
          </span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500/20">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-emerald-600 tabular-nums sm:text-3xl dark:text-emerald-400">
            {formatCurrency(summary.totalIncome)}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Total de entradas registradas
          </p>
        </div>
      </div>

      {/* Card de Despesas */}
      <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Despesas
          </span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:group-hover:bg-rose-500/20">
            <ArrowDownRight className="size-4" />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-rose-600 tabular-nums sm:text-3xl dark:text-rose-400">
            {formatCurrency(summary.totalExpense)}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Total de saídas registradas
          </p>
        </div>
      </div>
    </section>
  );
}
