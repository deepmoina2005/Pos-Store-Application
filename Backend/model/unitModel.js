export const unitModel = `
CREATE TABLE IF NOT EXISTS units (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  pcs TEXT,
  abbreviation TEXT NOT NULL UNIQUE
);`
