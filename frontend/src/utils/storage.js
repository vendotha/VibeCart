const KEY = "vibe_cart_v1";
export const saveCart = (cart) => localStorage.setItem(KEY, JSON.stringify(cart));
export const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || { items: [], total: 0 }; }
  catch { return { items: [], total: 0 }; }
};
