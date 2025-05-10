// On importe les composants nécessaires
import { useEffect, useState } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Home, PieChart, Plus, Settings, Wallet } from 'lucide-react-native';
import { createClient } from '@supabase/supabase-js';

// Création du client Supabase avec les variables d'environnement
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// Fonction principale qui retourne l'interface avec des onglets
export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On vérifie si l'utilisateur est connecté au montage du composant
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  // Pendant le chargement, on n'affiche rien
  if (isLoading) return null;

  // Si l'utilisateur n'est pas connecté, on redirige vers /login
  if (!isLoggedIn) return <Redirect href="/login" />;

  // Si l'utilisateur est connecté, on affiche les onglets
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarActiveTintColor: '#0f766e',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {/* Onglet 1 : Vue d'ensemble */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          headerTitle: 'Financial Overview',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      {/* Onglet 2 : Transactions */}
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          headerTitle: 'Transactions',
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
        }}
      />

      {/* Onglet 3 : Ajouter une transaction */}
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          headerTitle: 'New Transaction',
          tabBarIcon: ({ color, size }) => (
            <Plus
              size={size + 8}
              color={'#ffffff'}
              style={{
                backgroundColor: '#0f766e',
                padding: 8,
                borderRadius: 30,
                marginTop: -20,
              }}
            />
          ),
        }}
      />

      {/* Onglet 4 : Analytics */}
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          headerTitle: 'Financial Analytics',
          tabBarIcon: ({ color, size }) => <PieChart size={size} color={color} />,
        }}
      />

      {/* Onglet 5 : Paramètres */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
