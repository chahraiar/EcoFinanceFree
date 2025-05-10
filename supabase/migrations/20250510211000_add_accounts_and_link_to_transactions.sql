-- Création de la table accounts (comptes)
CREATE TABLE accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text DEFAULT 'checking', -- checking, savings, etc.
    initial_balance decimal DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Ajout de la colonne account_id dans transactions
ALTER TABLE transactions ADD COLUMN account_id uuid REFERENCES accounts(id) ON DELETE SET NULL;

-- Optionnel : index pour accélérer les requêtes
CREATE INDEX idx_transactions_account_id ON transactions(account_id);

-- RLS : chaque utilisateur ne peut voir que ses comptes
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own accounts" ON accounts
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());


/*
INSERT INTO accounts (user_id, name, type, initial_balance)
VALUES
  ('USER_ID_HERE', 'Main Account', 'checking', 18245.00),
  ('USER_ID_HERE', 'Savings', 'savings', 6317.00);

INSERT INTO accounts (user_id, name, type, initial_balance)
VALUES
  ('48f9c287-0196-4c77-a460-82218c298550', 'Main Account', 'checking', 18245.00),
  ('48f9c287-0196-4c77-a460-82218c298550', 'Savings', 'savings', 6317.00);
*/