import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // npm i node-fetch@3 if not installed

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, "..", "..", "products.json");
const useFake = process.env.USE_FAKE_STORE === "true";

router.get("/", async (_req, res) => {
  try {
    if (useFake) {
      const r = await fetch("https://fakestoreapi.com/products?limit=8");
      const data = await r.json();
      // Normalize: id, name, price
      const mapped = data.map(d => ({ id: String(d.id), name: d.title, price: Math.round(Number(d.price) * 85) })); // convert USD-ish to INR-ish
      return res.json(mapped);
    }
    const local = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    res.json(local);
  } catch (e) {
    res.status(502).json({ error: "Could not load products" });
  }
});

export default router;
