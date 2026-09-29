"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Calendar, Filter, ReceiptText, Repeat } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import { DeleteButton } from "./DeleteButton";

type FilterType = "all" | "income" | "expense";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = transactions.filter((t) => {
    if (filter === "income") return t.type === "income";
    if (filter === "expense") return t.type === "expense";
    return true;
  });

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
      {/* Header com Título e Filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Histórico
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {transactions.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Acompanhe suas últimas movimentações
          </p>
        </div>

        {/* Abas de Filtro */}
        {transactions.length > 0 && (
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/60 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 ${
                filter === "all"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setFilter("income")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 ${
                filter === "income"
                  ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              Receitas
            </button>
            <button
              type="button"
              onClick={() => setFilter("expense")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 ${
                filter === "expense"
                  ? "bg-white text-rose-700 shadow-sm dark:bg-slate-900 dark:text-rose-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              Despesas
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo da Lista */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500">
            {transactions.length === 0 ? (
              <ReceiptText className="size-6" />
            ) : (
              <Filter className="size-6" />
            )}
          </div>
          <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {transactions.length === 0
              ? "Nenhuma transação cadastrada"
              : "Nenhuma transação para este filtro"}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {transactions.length === 0
              ? "Adicione sua primeira receita ou despesa usando o formulário ao lado."
              : "Tente selecionar outra categoria de filtro acima."}
          </p>
        </div>
      ) : (
        <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.map((t) => {
            const isIncome = t.type === "income";
            return (
              <div
                key={t.id}
                className="group flex items-center justify-between gap-3 py-3 transition-colors hover:bg-slate-50/70 -mx-2 px-2 rounded-xl dark:hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-105 ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowUpRight className="size-4" />
                    ) : (
                      <ArrowDownRight className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {t.description}
                      </p>
                      {t.isRecurring && (
                        <span
                          title="Transação fixa (repete todo mês)"
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          <Repeat className="size-2.5" />
                          Fixa
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                      <Calendar className="size-3" />
                      <span>{formatDate(t.occurredOn)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold tabular-nums ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}
                  >
                    {isIncome ? "+" : "−"} {formatCurrency(t.amount)}
                  </span>

                  <DeleteButton id={t.id} description={t.description} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
