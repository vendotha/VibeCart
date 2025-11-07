// /backend/src/routes/checkout.js
import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, "..", "..", "products.json");

router.post("/", (req, res) => {
  const { cartItems = [], name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
  const total = cartItems.reduce((sum, it) => {
    const p = products.find(pr => pr.id === it.productId);
    return p ? sum + p.price * it.qty : sum;
  }, 0);

  const receipt = {
    receiptId: "rcpt_" + Math.random().toString(36).slice(2, 8),
    name,
    email,
    total,
    timestamp: new Date().toISOString()
  };
  res.status(201).json(receipt);
});

export default router;
