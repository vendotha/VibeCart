import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/client";
import { loadCart, saveCart } from "../utils/storage";

export default function useCart() {
  const [cart, setCart] = useState(loadCart());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // initial sync from server
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await api.get("/cart");
        if (!mounted) return;
        setCart(r.data);
        saveCart(r.data);
      } catch (e) {
        setError("Could not load cart");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const add = useCallback(async (productId) => {
    const optimistic = { ...cart, items: (() => {
      const copy = cart.items.slice();
      const idx = copy.findIndex(i => i.productId === productId);
      if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
      else copy.push({ productId, qty: 1 });
      return copy;
    })()};
    setCart(optimistic);

    try {
      const r = await api.post("/cart", { productId, qty: 1 });
      setCart(r.data);
      saveCart(r.data);
      return { ok: true };
    } catch (e) {
      setCart(cart); // rollback
      return { ok: false, error: "Failed to add to cart" };
    }
  }, [cart]);

  const remove = useCallback(async (productId) => {
    const prev = cart;
    setCart({ ...cart, items: cart.items.filter(i => i.productId !== productId) });
    try {
      const r = await api.delete(`/cart/${productId}`);
      setCart(r.data);
      saveCart(r.data);
      return { ok: true };
    } catch {
      setCart(prev);
      return { ok: false, error: "Failed to remove" };
    }
  }, [cart]);

  const setQty = useCallback(async (productId, qty) => {
    const prev = cart;
    const next = {
      ...cart,
      items: qty === 0
        ? cart.items.filter(i => i.productId !== productId)
        : cart.items.map(i => i.productId === productId ? { ...i, qty } : i)
    };
    setCart(next);
    try {
      const r = await api.post("/cart/update", { productId, qty });
      setCart(r.data);
      saveCart(r.data);
      return { ok: true };
    } catch {
      setCart(prev);
      return { ok: false, error: "Failed to update quantity" };
    }
  }, [cart]);

  const reset = useCallback(async () => {
    const r = await api.get("/cart");
    setCart(r.data);
    saveCart(r.data);
  }, []);

  return useMemo(() => ({
    cart, loading, error, add, remove, setQty, reset, setCart
  }), [cart, loading, error, add, remove, setQty, reset]);
}
