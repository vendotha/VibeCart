CREATE TABLE IF NOT EXISTS cart_items (
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  qty INTEGER NOT NULL,
  PRIMARY KEY (user_id, product_id)
);
