import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowDown, ArrowUp, Calendar, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';
import { createClient } from '@supabase/supabase-js';

// Initialisation de Supabase avec les variables d'environnement (.env)
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// Type pour différencier les transactions
type TransactionType = 'expense' | 'income';

export default function AddTransactionScreen() {
  // États pour les champs du formulaire
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Catégories existantes
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Charger les catégories depuis Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) return;
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('user_id', user.id);
        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Ajouter une nouvelle catégorie
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom de catégorie');
      return;
    }
    setLoadingCategories(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Utilisateur non authentifié.');
      const { error } = await supabase
        .from('categories')
        .insert({
          name: newCategoryName,
          type: type, // ou 'expense'/'income' selon contexte
          icon: '', // optionnel
          color: '', // optionnel
          user_id: user.id,
        });
      if (error) throw error;
      setNewCategoryName('');
      // Recharger la liste des catégories
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id);
      if (!fetchError) setCategories(data || []);
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Impossible d\'ajouter la catégorie');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fonction appelée lors de l'ajout
  const handleSubmit = async () => {

    Alert.alert('Debug', 'Add');

    if (!amount || !description || !category) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);
    try {
      // Récupération de l'utilisateur actuellement connecté
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Utilisateur non authentifié.");
      }

      // Insertion de la transaction dans Supabase avec le user_id
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type,
          amount: parseFloat(amount),
          description,
          category,
          date: new Date(date).toISOString(),
        });

      if (error) throw error;

      Alert.alert('Succès', 'Transaction ajoutée avec succès');
      router.push('/transactions'); // Redirection après succès
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'ajouter la transaction");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Montant */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>€</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Type de transaction (dépense / revenu) */}
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.typeButtonActive,
              { backgroundColor: type === 'expense' ? '#fee2e2' : '#f1f5f9' }
            ]}
            onPress={() => setType('expense')}>
            <ArrowDown size={20} color={type === 'expense' ? '#dc2626' : '#64748b'} />
            <Text style={[styles.typeText, { color: type === 'expense' ? '#dc2626' : '#64748b' }]}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.typeButtonActive,
              { backgroundColor: type === 'income' ? '#dcfce7' : '#f1f5f9' }
            ]}
            onPress={() => setType('income')}>
            <ArrowUp size={20} color={type === 'income' ? '#059669' : '#64748b'} />
            <Text style={[styles.typeText, { color: type === 'income' ? '#059669' : '#64748b' }]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Catégorie (combo + ajout) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Catégorie</Text>
          <View style={{ borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, backgroundColor: '#fff' }}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue: string) => setCategory(itemValue)}
              enabled={!loadingCategories && categories.length > 0}
            >
              <Picker.Item label={loadingCategories ? 'Chargement...' : 'Sélectionner une catégorie'} value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
              ))}
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Nouvelle catégorie"
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              style={{ backgroundColor: '#0f766e', borderRadius: 8, padding: 10 }}
              onPress={handleAddCategory}
              disabled={loadingCategories}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Calendar size={20} color="#64748b" />
            <Text style={styles.dateButtonText}>{date}</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton Ajouter */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}>
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter la transaction'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles de la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  form: {
    padding: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  currencySymbol: {
    fontSize: 48,
    fontWeight: '600',
    color: '#0f172a',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '600',
    color: '#0f172a',
    minWidth: 150,
    textAlign: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  typeButtonActive: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#64748b',
  },
  dateButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#0f172a',
  },
  submitButton: {
    backgroundColor: '#0f766e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
