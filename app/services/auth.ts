import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://zxqqxzueeyqsvxyudkfc.supabase.co',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'votre_clé_anonyme_supabase'
);

export class AuthService {
  static async signUp(email: string, password: string) {
    // Validation des données
    if (!email || !password) {
      throw new Error('Email et mot de passe sont requis');
    }

    if (!email.includes('@')) {
      throw new Error('Veuillez entrer une adresse email valide');
    }

    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:8081/auth/callback'
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          throw new Error('Cet email est déjà utilisé. Veuillez vous connecter.');
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      throw error;
    }
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:8081/auth/callback'
      }
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('Cet email est déjà utilisé. Veuillez vous connecter.');
      }
      throw error;
    }

    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}
