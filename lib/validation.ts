import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Informe uma descrição.")
    .max(120, "Máximo de 120 caracteres."),
  amount: z
    .string()
    .trim()
    .min(1, "Informe um valor.")
    // Aceita "1.234,56", "1234,56" e "1234.56"
    .transform((v) => Number(v.includes(",") ? v.replace(/\./g, "").replace(",", ".") : v))
    .pipe(
      z
        .number({ error: "Valor inválido." })
        .positive("O valor deve ser maior que zero.")
        .max(9_999_999_999.99, "Valor muito alto.")
        .transform((n) => Math.round(n * 100) / 100),
    ),
  type: z.enum(["income", "expense"], { error: "Escolha Receita ou Despesa." }),
  occurredOn: z
    .string()
    .trim()
    .min(1, "Informe uma data.")
    .transform((val) => {
      const cleaned = val.trim();
      const brMatch = cleaned.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (brMatch) {
        return `${brMatch[3]}-${brMatch[2]}-${brMatch[1]}`;
      }
      const rawMatch = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
      if (rawMatch) {
        return `${rawMatch[3]}-${rawMatch[2]}-${rawMatch[1]}`;
      }
      return cleaned;
    })
    .pipe(z.iso.date("Data inválida.")),
  isRecurring: z
    .preprocess((val) => val === "on" || val === "true" || val === true, z.boolean())
    .default(false),
});

export const idSchema = z.uuid();
