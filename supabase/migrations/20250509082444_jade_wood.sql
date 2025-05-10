/*
  # Création de la table des transactions

  1. Nouvelle Table
    - `transactions`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence vers auth.users)
      - `type` (text, 'expense' ou 'income')
      - `amount` (decimal, montant de la transaction)
      - `description` (text, description de la transaction)
      - `category` (text, catégorie de la transaction)
      - `date` (timestamptz, date de la transaction)
      - `created_at` (timestamptz, date de création)

  2. Sécurité
    - Active RLS sur la table transactions
    - Ajoute des politiques pour que les utilisateurs ne puissent voir et modifier que leurs propres transactions
*/

CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text NOT NULL CHECK (type IN ('expense', 'income')),
  amount decimal NOT NULL CHECK (amount > 0),
  description text NOT NULL,
  category text NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON transactions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON transactions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);