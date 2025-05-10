export type Transaction = {
  id: number;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  category: string;
  date: string;
};
