import db from '../database/db.js';

export const createUnit = (req, res) => {
  const { name, abbreviation } = req.body;
  if (!name || !abbreviation)
    return res.status(400).json({ error: 'Both name and abbreviation are required' });

  try {
    const result = db.prepare(`
      INSERT INTO units (name, abbreviation) VALUES (?, ?)
    `).run(name, abbreviation);
    res.status(201).json({ message: 'Unit created', id: result.lastInsertRowid });
  } catch {
    res.status(500).json({ error: 'Failed to create unit' });
  }
};

export const getAllUnits = (req, res) => {
  try {
    const units = db.prepare(`SELECT * FROM units`).all();
    res.json(units);
  } catch {
    res.status(500).json({ error: 'Failed to fetch units' });
  }
};

export const getUnitById = (req, res) => {
  const { id } = req.params;
  const unit = db.prepare(`SELECT * FROM units WHERE id = ?`).get(id);
  unit ? res.json(unit) : res.status(404).json({ error: 'Unit not found' });
};

export const updateUnit = (req, res) => {
  const { id } = req.params;
  const { name, abbreviation } = req.body;

  try {
    db.prepare(`
      UPDATE units SET name = ?, abbreviation = ? WHERE id = ?
    `).run(name, abbreviation, id);

    res.json({ message: 'Unit updated' });
  } catch {
    res.status(500).json({ error: 'Failed to update unit' });
  }
};

export const deleteUnit = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare(`DELETE FROM units WHERE id = ?`).run(id);
    res.json({ message: 'Unit deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete unit' });
  }
};
