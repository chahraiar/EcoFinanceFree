import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react-native';

export default function OverviewScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>€24,562.00</Text>
        <View style={styles.accountsList}>
          <View style={styles.accountItem}>
            <Wallet size={20} color="#0f766e" />
            <Text style={styles.accountName}>Main Account</Text>
            <Text style={styles.accountBalance}>€18,245.00</Text>
          </View>
          <View style={styles.accountItem}>
            <Wallet size={20} color="#0f766e" />
            <Text style={styles.accountName}>Savings</Text>
            <Text style={styles.accountBalance}>€6,317.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <ArrowUpRight size={20} color="#059669" />
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <Text style={styles.statAmount}>€3,240.00</Text>
          <Text style={styles.statPeriod}>This month</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <ArrowDownRight size={20} color="#dc2626" />
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <Text style={styles.statAmount}>€2,140.00</Text>
          <Text style={styles.statPeriod}>This month</Text>
        </View>
      </View>

      <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {/* Placeholder for recent transactions list */}
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