import db from '../database/db.js';

export const createProduct = (req, res) => {
  const { name, description, selling_price, cost_price, stock, unit_of_measure, brand, category_id } = req.body;

  if (!name || selling_price == null || stock == null || !unit_of_measure)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, selling_price, cost_price, stock, unit_of_measure, brand, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      name, description || null, selling_price, cost_price || 0,
      stock, unit_of_measure, brand || null, category_id || null
    );
    res.status(201).json({ message: 'Product created', id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const getAllProducts = (req, res) => {
  try {
    const products = db.prepare(`SELECT * FROM products`).all();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, selling_price, cost_price, stock, unit_of_measure, brand, category_id } = req.body;

  try {
    db.prepare(`
      UPDATE products
      SET name = ?, description = ?, selling_price = ?, cost_price = ?, stock = ?, unit_of_measure = ?, brand = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, description, selling_price, cost_price, stock, unit_of_measure, brand, category_id, id);

    res.json({ message: 'Product updated' });
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
    res.json({ message: 'Product deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
