export interface Expense {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
  }
  