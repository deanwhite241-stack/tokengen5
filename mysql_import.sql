/*
  MySQL schema for TokenGen3 platform.
  - Users, Tokens, Presales, Vesting Schedules, Transactions tables.
  - All constraints and indexes compatible with MySQL 8+.
  - Use this file to import into phpMyAdmin or MySQL CLI.
*/

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(42) NOT NULL UNIQUE,
  nonce VARCHAR(64) NOT NULL,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  esr_balance DECIMAL(38,18) DEFAULT 0,
  esr_last_checked TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TOKENS TABLE
CREATE TABLE IF NOT EXISTS tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_address VARCHAR(42) NOT NULL UNIQUE,
  contract_type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  decimals INT NOT NULL DEFAULT 18,
  initial_supply DECIMAL(38,18) NOT NULL,
  max_supply DECIMAL(38,18) DEFAULT 0,
  owner_address VARCHAR(42) NOT NULL,
  network_id VARCHAR(20) NOT NULL,
  network_name VARCHAR(50) NOT NULL,
  network_chain_id INT NOT NULL,
  transaction_hash VARCHAR(66) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  features JSON NOT NULL DEFAULT (JSON_OBJECT()),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tokens_owner FOREIGN KEY (owner_address) REFERENCES users(address) ON DELETE CASCADE
);

CREATE INDEX idx_tokens_owner ON tokens(owner_address);

-- 3. PRESALES TABLE
CREATE TABLE IF NOT EXISTS presales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_address VARCHAR(42) NOT NULL UNIQUE,
  token_address VARCHAR(42) NOT NULL,
  owner_address VARCHAR(42) NOT NULL,
  sale_type VARCHAR(20) NOT NULL,
  token_info JSON NOT NULL,
  sale_configuration JSON NOT NULL,
  vesting_config JSON NULL,
  wallet_setup JSON NOT NULL,
  network_id VARCHAR(20) NOT NULL,
  network_name VARCHAR(50) NOT NULL,
  network_chain_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming',
  transaction_hash VARCHAR(66) NOT NULL,
  total_raised DECIMAL(38,18) DEFAULT 0,
  participant_count INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_presales_owner FOREIGN KEY (owner_address) REFERENCES users(address) ON DELETE CASCADE,
  CONSTRAINT fk_presales_token FOREIGN KEY (token_address) REFERENCES tokens(contract_address) ON DELETE CASCADE
);

CREATE INDEX idx_presales_owner ON presales(owner_address);
CREATE INDEX idx_presales_token ON presales(token_address);

-- 4. VESTING SCHEDULES TABLE
CREATE TABLE IF NOT EXISTS vesting_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token_address VARCHAR(42) NOT NULL,
  beneficiary_address VARCHAR(42) NOT NULL,
  total_amount DECIMAL(38,18) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  duration INT NOT NULL, -- in seconds
  released_amount DECIMAL(38,18) DEFAULT 0,
  revoked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_vesting_token FOREIGN KEY (token_address) REFERENCES tokens(contract_address) ON DELETE CASCADE,
  UNIQUE KEY unique_token_beneficiary (token_address, beneficiary_address)
);

CREATE INDEX idx_vesting_token ON vesting_schedules(token_address);
CREATE INDEX idx_vesting_beneficiary ON vesting_schedules(beneficiary_address);

-- 5. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_hash VARCHAR(66) NOT NULL UNIQUE,
  transaction_type VARCHAR(20) NOT NULL,
  from_address VARCHAR(42) NOT NULL,
  to_address VARCHAR(42),
  amount DECIMAL(38,18),
  token_address VARCHAR(42),
  network_id VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  gas_used DECIMAL(38,18),
  block_number INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_from ON transactions(from_address);
CREATE INDEX idx_transactions_to ON transactions(to_address);
CREATE INDEX idx_transactions_token ON transactions(token_address);

-- End of schema
