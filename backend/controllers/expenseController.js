import pool from "../config/db.js";

export const getExpenses = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC, id DESC",
      [req.user.id]
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch expenses", error: error.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, expense_date, notes } = req.body;

    if (!title || !amount || !category || !expense_date) {
      return res.status(400).json({ message: "Title, amount, category and date are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO expenses (user_id, title, amount, category, expense_date, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [req.user.id, title, amount, category, expense_date, notes || ""]
    );

    const [created] = await pool.query("SELECT * FROM expenses WHERE id = ?", [result.insertId]);
    return res.status(201).json(created[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to add expense", error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, expense_date, notes } = req.body;

    const [existing] = await pool.query(
      "SELECT * FROM expenses WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await pool.query(
      "UPDATE expenses SET title = ?, amount = ?, category = ?, expense_date = ?, notes = ? WHERE id = ? AND user_id = ?",
      [title, amount, category, expense_date, notes || "", id, req.user.id]
    );

    const [updated] = await pool.query("SELECT * FROM expenses WHERE id = ?", [id]);
    return res.json(updated[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update expense", error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      "SELECT id FROM expenses WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await pool.query("DELETE FROM expenses WHERE id = ? AND user_id = ?", [id, req.user.id]);
    return res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete expense", error: error.message });
  }
};

export const getExpenseSummary = async (req, res) => {
  try {
    const [totals] = await pool.query(
      "SELECT COUNT(*) AS totalCount, COALESCE(SUM(amount), 0) AS totalAmount FROM expenses WHERE user_id = ?",
      [req.user.id]
    );

    const [byCategory] = await pool.query(
      "SELECT category, ROUND(SUM(amount), 2) AS total FROM expenses WHERE user_id = ? GROUP BY category ORDER BY total DESC",
      [req.user.id]
    );

    const [byMonth] = await pool.query(
      `SELECT DATE_FORMAT(expense_date, '%Y-%m') AS month, ROUND(SUM(amount), 2) AS total
       FROM expenses
       WHERE user_id = ?
       GROUP BY DATE_FORMAT(expense_date, '%Y-%m')
       ORDER BY month DESC`,
      [req.user.id]
    );

    return res.json({
      overview: totals[0],
      byCategory,
      byMonth
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load summary", error: error.message });
  }
};
