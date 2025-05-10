/*
  # Création de la table des catégories

  1. Nouvelle Table
    - `categories`
      - `id` (uuid, clé primaire)
      - `name` (text, nom de la catégorie)
      - `type` (text, 'expense' ou 'income')
      - `icon` (text, icône de la catégorie)
      - `color` (text, couleur de la catégorie)
      - `user_id` (uuid, référence vers auth.users)
      - `created_at` (timestamptz, date de création)

  2. Sécurité
    - Active RLS sur la table categories
    - Ajoute des politiques pour que les utilisateurs ne puissent voir et modifier que leurs propres catégories
*/

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('expense', 'income')),
  icon text,
  color text,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
