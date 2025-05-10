import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Search, Filter } from 'lucide-react-native';

type Transaction = {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  category: string;
  date: string;
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 42.50,
    description: 'Courses alimentaires',
    category: 'Alimentation',
    date: '2024-02-15'
  },
  {
    id: '2',
    type: 'income',
    amount: 2000,
    description: 'Salaire',
    category: 'Revenu',
    date: '2024-02-01'
  },
  // Ajoutez d'autres transactions pour les tests
];

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(mockTransactions);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text 
          style={[
            styles.transactionAmount,
            { color: item.type === 'expense' ? '#dc2626' : '#059669' }
          ]}>
          {item.type === 'expense' ? '-' : '+'}€{item.amount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>{item.category}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une transaction"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
    color: '#0f172a',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionCategory: {
    fontSize: 14,
    color: '#64748b',
  },
  transactionDate: {
    fontSize: 14,
    color: '#94a3b8',
  },
});