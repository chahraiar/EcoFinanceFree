import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { AuthService, supabase } from './services/auth';

// Fonction pour insérer les catégories par défaut pour un nouvel utilisateur
async function insertDefaultCategories(userId: string) {
  const defaultCategories = [
    // Dépenses
    { name: 'Alimentation', type: 'expense', icon: '🍔', color: '#FFB300' },
    { name: 'Logement', type: 'expense', icon: '🏠', color: '#1976D2' },
    { name: 'Transports', type: 'expense', icon: '🚌', color: '#388E3C' },
    { name: 'Santé', type: 'expense', icon: '💊', color: '#D32F2F' },
    { name: 'Éducation', type: 'expense', icon: '📚', color: '#512DA8' },
    { name: 'Loisirs', type: 'expense', icon: '🎮', color: '#FBC02D' },
    { name: 'Voyages', type: 'expense', icon: '✈️', color: '#0288D1' },
    { name: 'Shopping', type: 'expense', icon: '🛒', color: '#7B1FA2' },
    { name: 'Assurances', type: 'expense', icon: '🛡️', color: '#455A64' },
    { name: 'Téléphone & Internet', type: 'expense', icon: '📱', color: '#0097A7' },
    { name: 'Impôts & Taxes', type: 'expense', icon: '💸', color: '#C62828' },
    { name: 'Cadeaux & Dons', type: 'expense', icon: '🎁', color: '#F06292' },
    { name: 'Enfants', type: 'expense', icon: '🧸', color: '#FBC02D' },
    { name: 'Animaux', type: 'expense', icon: '🐶', color: '#8D6E63' },
    { name: 'Autres', type: 'expense', icon: '❓', color: '#BDBDBD' },
    // Revenus
    { name: 'Salaire', type: 'income', icon: '💼', color: '#388E3C' },
    { name: 'Prime', type: 'income', icon: '🏆', color: '#FBC02D' },
    { name: 'Vente', type: 'income', icon: '🛒', color: '#1976D2' },
    { name: 'Remboursement', type: 'income', icon: '💳', color: '#0288D1' },
    { name: 'Investissement', type: 'income', icon: '📈', color: '#512DA8' },
    { name: 'Autres', type: 'income', icon: '❓', color: '#BDBDBD' },
  ];
  for (const cat of defaultCategories) {
    await supabase.from('categories').insert({
      ...cat,
      user_id: userId,
    });
  }
}

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const { user } = await AuthService.signUp(email, password);
      if (user && user.id) {
        await insertDefaultCategories(user.id);
      }
      Alert.alert('Succès', 'Un email de confirmation a été envoyé à votre adresse. Veuillez le vérifier pour finaliser votre inscription.');
      router.replace('/login');
    } catch (error: any) {
      console.error('Erreur détaillée:', error);
      Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de la création du compte. Vérifiez que votre email est valide et que votre mot de passe contient au moins 6 caractères.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#94a3b8"
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#94a3b8"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Création...' : 'Créer un compte'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.replace('login:login')}
      >
        <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0f766e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#0f766e',
    fontSize: 16,
    fontWeight: '500',
  },
});
