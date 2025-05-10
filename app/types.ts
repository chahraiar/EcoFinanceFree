export type Account = {
  id: string;
  user_id: string;
  name: string;
  type: string;
  initial_balance: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: number;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  category: string;
  date: string;
  account_id: string;
};
