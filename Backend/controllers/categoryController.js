import db from '../database/db.js';

export const createCategory = (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required' });

  try {
    const result = db.prepare(`INSERT INTO categories (name, description) VALUES (?, ?)`)
                    .run(name, description || null);
    res.status(201).json({ message: 'Category created', id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

export const getAllCategories = (req, res) => {
  try {
    const categories = db.prepare(`SELECT * FROM categories`).all();
    res.json(categories);
  } catch {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = (req, res) => {
  const { id } = req.params;
  const category = db.prepare(`SELECT * FROM categories WHERE id = ?`).get(id);
  category ? res.json(category) : res.status(404).json({ error: 'Category not found' });
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    db.prepare(`UPDATE categories SET name = ?, description = ? WHERE id = ?`)
      .run(name, description || null, id);
    res.json({ message: 'Category updated' });
  } catch {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare(`DELETE FROM categories WHERE id = ?`).run(id);
    res.json({ message: 'Category deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
