export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  occurredOn: string; // YYYY-MM-DD
};

export type Summary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};
