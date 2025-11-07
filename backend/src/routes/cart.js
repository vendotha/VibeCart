// /backend/src/routes/cart.js
import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, "..", "..", "products.json");

// ---- Persistence toggle (in-memory by default, SQLite when enabled)
const useSqlite = process.env.USE_SQLITE === "true";
let getDb = null;
if (useSqlite) {
  // Ensure you have /backend/src/db/sqlite.js set up (with getDb and schema.sql)
  ({ getDb } = await import("../db/sqlite.js"));
}

// ---- In-memory fallback store: { userId: { items: [{ productId, qty }] } }
const carts = new Map();

// ---- Helpers
const readProducts = () => JSON.parse(fs.readFileSync(productsPath, "utf-8"));

const calculateTotal = (items, products) =>
  items.reduce((sum, it) => {
    const p = products.find(pr => pr.id === it.productId);
    return p ? sum + p.price * it.qty : sum;
  }, 0);

const normalizeQty = (q) => {
  const n = Number(q);
  if (!Number.isFinite(n)) return NaN;
  return Math.trunc(n);
};

const getUserId = (req) => (req.header("x-user-id") || "user_123").toString();

// SQLite-backed read/write
async function sqlReadItems(userId) {
  const db = await getDb();
  const rows = await db.all(
    "SELECT product_id as productId, qty FROM cart_items WHERE user_id = ?",
    userId
  );
  return rows;
}

async function sqlWriteItem(userId, productId, qty) {
  const db = await getDb();
  if (qty === 0) {
    await db.run(
      "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
      userId,
      productId
    );
  } else {
    await db.run(
      "INSERT OR REPLACE INTO cart_items(user_id, product_id, qty) VALUES(?,?,?)",
      userId,
      productId,
      qty
    );
  }
}

async function sqlSetQty(userId, productId, qty) {
  return sqlWriteItem(userId, productId, qty);
}

// In-memory read/write
function memReadItems(userId) {
  return (carts.get(userId) || { items: [] }).items;
}

function memWriteItem(userId, productId, qty) {
  const cart = carts.get(userId) || { items: [] };
  const idx = cart.items.findIndex(i => i.productId === productId);
  if (qty === 0) {
    cart.items = cart.items.filter(i => i.productId !== productId);
  } else if (idx >= 0) {
    cart.items[idx] = { ...cart.items[idx], qty };
  } else {
    cart.items.push({ productId, qty });
  }
  carts.set(userId, cart);
}

function memSetQty(userId, productId, qty) {
  memWriteItem(userId, productId, qty);
}

// Abstraction over storage layer
async function readItems(userId) {
  return useSqlite ? sqlReadItems(userId) : memReadItems(userId);
}

async function setQty(userId, productId, qty) {
  return useSqlite ? sqlSetQty(userId, productId, qty) : memSetQty(userId, productId, qty);
}

// ---- Routes

// GET /api/cart -> { items, total }
router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    const products = readProducts();
    const items = await readItems(userId);
    const total = calculateTotal(items, products);
    res.json({ items, total });
  } catch (e) {
    console.error("GET /api/cart error:", e);
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// POST /api/cart { productId, qty } -> add/increment item
router.post("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId, qty = 1 } = req.body || {};
    const parsedQty = normalizeQty(qty);
    if (!productId || !Number.isFinite(parsedQty) || parsedQty <= 0) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const products = readProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const current = await readItems(userId);
    const existing = current.find(i => i.productId === productId)?.qty || 0;
    await setQty(userId, productId, existing + parsedQty);

    const items = await readItems(userId);
    const total = calculateTotal(items, products);
    res.status(201).json({ items, total });
  } catch (e) {
    console.error("POST /api/cart error:", e);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// DELETE /api/cart/:id -> remove item
router.delete("/:id", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id: productId } = req.params;

    const products = readProducts();
    // Set qty to 0 = remove
    await setQty(userId, productId, 0);

    const items = await readItems(userId);
    const total = calculateTotal(items, products);
    res.json({ items, total });
  } catch (e) {
    console.error("DELETE /api/cart/:id error:", e);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// POST /api/cart/update { productId, qty } -> update quantity / remove on 0
router.post("/update", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId, qty } = req.body || {};
    const parsedQty = normalizeQty(qty);

    if (!productId || !Number.isFinite(parsedQty) || parsedQty < 0) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // When qty === 0, treat as remove
    await setQty(userId, productId, parsedQty);

    const products = readProducts();
    const items = await readItems(userId);
    const total = calculateTotal(items, products);
    res.json({ items, total });
  } catch (e) {
    console.error("POST /api/cart/update error:", e);
    res.status(500).json({ error: "Failed to update item" });
  }
});

export default router;
