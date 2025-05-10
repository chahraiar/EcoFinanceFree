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


CREATE OR REPLACE FUNCTION insert_default_categories_for_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Dépenses
  INSERT INTO categories (name, type, user_id, icon, color)
  VALUES
    ('Alimentation', 'expense', NEW.id, '🍔', '#FFB300'),
    ('Logement', 'expense', NEW.id, '🏠', '#1976D2'),
    ('Transports', 'expense', NEW.id, '🚌', '#388E3C'),
    ('Santé', 'expense', NEW.id, '💊', '#D32F2F'),
    ('Éducation', 'expense', NEW.id, '📚', '#512DA8'),
    ('Loisirs', 'expense', NEW.id, '🎮', '#FBC02D'),
    ('Voyages', 'expense', NEW.id, '✈️', '#0288D1'),
    ('Shopping', 'expense', NEW.id, '🛒', '#7B1FA2'),
    ('Assurances', 'expense', NEW.id, '🛡️', '#455A64'),
    ('Téléphone & Internet', 'expense', NEW.id, '📱', '#0097A7'),
    ('Impôts & Taxes', 'expense', NEW.id, '💸', '#C62828'),
    ('Cadeaux & Dons', 'expense', NEW.id, '🎁', '#F06292'),
    ('Enfants', 'expense', NEW.id, '🧸', '#FBC02D'),
    ('Animaux', 'expense', NEW.id, '🐶', '#8D6E63'),
    ('Autres', 'expense', NEW.id, '❓', '#BDBDBD');

  -- Revenus
  INSERT INTO categories (name, type, user_id, icon, color)
  VALUES
    ('Salaire', 'income', NEW.id, '💼', '#388E3C'),
    ('Prime', 'income', NEW.id, '🏆', '#FBC02D'),
    ('Vente', 'income', NEW.id, '🛒', '#1976D2'),
    ('Remboursement', 'income', NEW.id, '💳', '#0288D1'),
    ('Investissement', 'income', NEW.id, '📈', '#512DA8'),
    ('Autres', 'income', NEW.id, '❓', '#BDBDBD');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER add_default_categories_after_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION insert_default_categories_for_user();