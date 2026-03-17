CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(120) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  expense_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password)
VALUES ('Demo User', 'demo@example.com', '$2b$10$Ar/MmV0OgufM9PWZEY4QxO3oTAE2n9Y5xRcbk6VwBEm90LkAMPx3W')
ON DUPLICATE KEY UPDATE email=email;

-- Password for demo user is: 123456

INSERT INTO expenses (user_id, title, amount, category, expense_date, notes)
SELECT 1, 'Groceries', 1200.00, 'Food', '2026-03-10', 'Weekly groceries'
WHERE NOT EXISTS (SELECT 1 FROM expenses WHERE title='Groceries' AND user_id=1);

INSERT INTO expenses (user_id, title, amount, category, expense_date, notes)
SELECT 1, 'Auto Fare', 300.00, 'Travel', '2026-03-12', 'Daily travel'
WHERE NOT EXISTS (SELECT 1 FROM expenses WHERE title='Auto Fare' AND user_id=1);

INSERT INTO expenses (user_id, title, amount, category, expense_date, notes)
SELECT 1, 'Internet Bill', 799.00, 'Bills', '2026-03-15', 'Monthly WiFi'
WHERE NOT EXISTS (SELECT 1 FROM expenses WHERE title='Internet Bill' AND user_id=1);
