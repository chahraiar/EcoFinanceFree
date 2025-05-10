import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useState } from 'react';

export default function AnalyticsScreen() {
  const screenWidth = Dimensions.get('window').width;
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [2500, 3200, 2800, 3800, 2900, 3500],
        color: () => '#0f766e',
        strokeWidth: 2,
      },
      {
        data: [2000, 2800, 2400, 3000, 2600, 3200],
        color: () => '#dc2626',
        strokeWidth: 2,
      },
    ],
    legend: ['Revenus', 'Dépenses'],
  };

  const pieData = [
    {
      name: 'Alimentation',
      population: 800,
      color: '#0f766e',
      legendFontColor: '#64748b',
    },
    {
      name: 'Transport',
      population: 400,
      color: '#0d9488',
      legendFontColor: '#64748b',
    },
    {
      name: 'Loisirs',
      population: 300,
      color: '#14b8a6',
      legendFontColor: '#64748b',
    },
    {
      name: 'Factures',
      population: 600,
      color: '#2dd4bf',
      legendFontColor: '#64748b',
    },
  ];

  const PeriodSelector = () => (
    <View style={styles.periodSelector}>
      <TouchableOpacity
        style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
        onPress={() => setSelectedPeriod('week')}>
        <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.periodButtonTextActive]}>
          Semaine
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
        onPress={() => setSelectedPeriod('month')}>
        <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.periodButtonTextActive]}>
          Mois
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
        onPress={() => setSelectedPeriod('year')}>
        <Text style={[styles.periodButtonText, selectedPeriod === 'year' && styles.periodButtonTextActive]}>
          Année
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <PeriodSelector />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Revenus vs Dépenses</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(15, 118, 110, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffffff',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Répartition des Dépenses</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(15, 118, 110, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Dépenses Totales</Text>
          <Text style={styles.statValue}>2 100 €</Text>
          <Text style={styles.statPeriod}>Ce mois</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Moyenne Quotidienne</Text>
          <Text style={styles.statValue}>70 €</Text>
          <Text style={styles.statPeriod}>Ce mois</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Plus grosse dépense</Text>
          <Text style={styles.statValue}>450 €</Text>
          <Text style={styles.statPeriod}>Loyer</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Économies</Text>
          <Text style={styles.statValue}>+15%</Text>
          <Text style={styles.statPeriod}>vs mois dernier</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#0f766e',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  statPeriod: {
    fontSize: 13,
    color: '#94a3b8',
  },
});