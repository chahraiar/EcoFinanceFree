import { createClient } from '@supabase/supabase-js';
import { Transaction } from '../types';

export class DatabaseService {
  private static instance: DatabaseService;
  private supabase: any;

  private constructor() {
    try {
      this.supabase = createClient(
        process.env.EXPO_PUBLIC_SUPABASE_URL!,
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
      );
    } catch (error) {
      console.error('Error initializing Supabase:', error);
      throw new Error('Failed to initialize Supabase connection');
    }
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Méthodes pour gérer les transactions
  public async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const { data, error } = await this.supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  }

  public async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await this.supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  }

  public async deleteTransaction(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  public async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const { data, error } = await this.supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  }
  }

