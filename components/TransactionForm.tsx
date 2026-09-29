"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FileText,
  Loader2,
  Plus,
} from "lucide-react";
import { createTransaction, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle", submissionId: 0 };

export function TransactionForm({ today }: { today: string }) {
  const [state, formAction] = useActionState(createTransaction, initialState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const [dateValue, setDateValue] = useState(values.occurredOn ?? today);

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) {
      v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length > 2) {
      v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    setDateValue(v);
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Nova Transação
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Cadastre uma nova movimentação na sua conta
        </p>
      </div>

      <form
        key={state.submissionId}
        action={formAction}
        className="space-y-4"
      >
        {/* Tipo: Segmented Control */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tipo de movimentação
          </label>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/60">
            <TypeOption
              value="income"
              label="Receita"
              icon={<ArrowUpRight className="size-4" />}
              defaultChecked={(values.type ?? "income") === "income"}
            />
            <TypeOption
              value="expense"
              label="Despesa"
              icon={<ArrowDownRight className="size-4" />}
              defaultChecked={values.type === "expense"}
            />
          </div>
          <FieldError messages={errors.type} />
        </div>

        {/* Descrição */}
        <Field label="Descrição" htmlFor="description" errors={errors.description}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <FileText className="size-4" />
            </div>
            <input
              id="description"
              name="description"
              type="text"
              required
              maxLength={120}
              placeholder="Ex.: Salário, Mercado, Aluguel"
              defaultValue={values.description}
              aria-invalid={!!errors.description}
              className={`${inputClass} pl-9`}
            />
          </div>
        </Field>

        {/* Valor e Data */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Valor" htmlFor="amount" errors={errors.amount}>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-semibold text-slate-400">
                R$
              </span>
              <input
                id="amount"
                name="amount"
                type="text"
                inputMode="decimal"
                required
                placeholder="0,00"
                defaultValue={values.amount}
                aria-invalid={!!errors.amount}
                className={`${inputClass} pl-9 tabular-nums`}
              />
            </div>
          </Field>

          <Field label="Data" htmlFor="occurredOn" errors={errors.occurredOn}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Calendar className="size-4" />
              </div>
              <input
                id="occurredOn"
                name="occurredOn"
                type="text"
                inputMode="numeric"
                required
                maxLength={10}
                placeholder="DD/MM/AAAA"
                value={dateValue}
                onChange={handleDateChange}
                aria-invalid={!!errors.occurredOn}
                className={`${inputClass} pl-9 tabular-nums`}
              />
            </div>
          </Field>
        </div>

        {/* Feedback Alert */}
        {state.message && (
          <div
            role="status"
            className={`flex items-center gap-2 rounded-xl p-3 text-xs font-medium ${
              state.status === "error"
                ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40"
            }`}
          >
            {state.status === "error" ? (
              <AlertCircle className="size-4 shrink-0 text-rose-500" />
            ) : (
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
            )}
            <span>{state.message}</span>
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-3 text-sm font-medium text-slate-900 transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 aria-invalid:border-rose-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-300 dark:focus:bg-slate-900 dark:focus:ring-white/20";

function Field({
  label,
  htmlFor,
  errors,
  children,
}: {
  label: string;
  htmlFor: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
      >
        {label}
      </label>
      {children}
      <FieldError messages={errors} />
    </div>
  );
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
      <AlertCircle className="size-3.5 shrink-0" />
      <span>{messages[0]}</span>
    </p>
  );
}

function TypeOption({
  value,
  label,
  icon,
  defaultChecked,
}: {
  value: "income" | "expense";
  label: string;
  icon: React.ReactNode;
  defaultChecked: boolean;
}) {
  const isIncome = value === "income";

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="type"
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span
        className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all duration-150 ${
          isIncome
            ? "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 peer-checked:bg-white peer-checked:text-emerald-700 peer-checked:shadow-sm dark:peer-checked:bg-slate-900 dark:peer-checked:text-emerald-400"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 peer-checked:bg-white peer-checked:text-rose-700 peer-checked:shadow-sm dark:peer-checked:bg-slate-900 dark:peer-checked:text-rose-400"
        }`}
      >
        {icon}
        {label}
      </span>
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Salvando...</span>
        </>
      ) : (
        <>
          <Plus className="size-4" />
          <span>Adicionar Transação</span>
        </>
      )}
    </button>
  );
}
