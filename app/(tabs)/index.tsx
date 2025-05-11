import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react-native';
import { useAccounts } from './add_account_helpers';
import { useTransactions } from './transactions_helpers';
import { useMemo } from 'react';
import { Account, Transaction } from '../types';

export default function OverviewScreen() {
  const { accounts, loading: loadingAccounts } = useAccounts();
  const { transactions, loading: loadingTransactions } = useTransactions();
  const loading = loadingAccounts || loadingTransactions;

  // Calculs dynamiques
  const { totalBalance, accountBalances, income, expenses } = useMemo(() => {
    if (!accounts || !transactions) return { totalBalance: 0, accountBalances: [], income: 0, expenses: 0 };
    // Calcul du solde de chaque compte
    const accountBalances = accounts.map((account: Account) => {
      const txns = transactions.filter((t: Transaction) => t.account_id === account.id);
      const txnSum = txns.reduce((sum: number, t: Transaction) => sum + (t.type === 'expense' ? -t.amount : t.amount), 0);
      return {
        ...account,
        balance: account.initial_balance + txnSum,
      };
    });
    const totalBalance = accountBalances.reduce((sum, acc) => sum + acc.balance, 0);
    // Date du mois courant
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    // Transactions du mois courant
    const monthTxns = transactions.filter((t: Transaction) => {
      const d = new Date(t.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
    const income = monthTxns.filter((t: Transaction) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTxns.filter((t: Transaction) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { totalBalance, accountBalances, income, expenses };
  }, [accounts, transactions]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0f766e" />
        ) : (
          <Text style={styles.balanceAmount}>
            €{totalBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        )}
        <View style={styles.accountsList}>
          {loading ? (
            <ActivityIndicator size="small" color="#0f766e" />
          ) : (
            accountBalances.map((acc) => (
              <View style={styles.accountItem} key={acc.id}>
                <Wallet size={20} color="#0f766e" />
                <Text style={styles.accountName}>{acc.name}</Text>
                <Text style={styles.accountBalance}>
                  €{acc.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <ArrowUpRight size={20} color="#059669" />
            <Text style={styles.statLabel}>Income</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#059669" />
          ) : (
            <Text style={styles.statAmount}>
              €{income.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          )}
          <Text style={styles.statPeriod}>This month</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <ArrowDownRight size={20} color="#dc2626" />
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#dc2626" />
          ) : (
            <Text style={styles.statAmount}>
              €{expenses.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          )}
          <Text style={styles.statPeriod}>This month</Text>
        </View>
      </View>

      <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {/* À compléter : liste des transactions récentes */}
        <Text style={styles.placeholder}>No recent transactions</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 20,
  },
  accountsList: {
    gap: 12,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
  },
  accountName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#334155',
  },
  accountBalance: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0f172a',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
  },
  statAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  statPeriod: {
    fontSize: 13,
    color: '#94a3b8',
  },
  recentTransactions: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  placeholder: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 15,
    paddingVertical: 20,
  },
});