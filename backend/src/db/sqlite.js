import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbPromise;
export async function getDb() {
  if (!dbPromise) {
    dbPromise = open({ filename: path.join(__dirname, "cart.db"), driver: sqlite3.Database });
    const db = await dbPromise;
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    await db.exec(schema);
  }
  return dbPromise;
}
