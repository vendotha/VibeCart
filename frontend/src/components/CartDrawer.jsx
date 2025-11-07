import { useEffect, useMemo, useRef } from "react";
import { formatINR } from "../utils/currency";
import Button from "./Button";
import QuantityStepper from "./QuantityStepper";
import EmptyState from "./EmptyState";

export default function CartDrawer({
  open,
  onClose,
  cart,
  products = [],
  onQty,
  onRemove,
  onCheckout
}) {
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Map cart items -> enrich with product data (name, price, image)
  const enrichedItems = useMemo(() => {
    return (cart.items || []).map((it) => {
      const p = products.find((x) => x.id === it.productId) || {};
      return {
        ...it,
        name: p.name || it.productId,
        price: p.price ?? 0,
        image:
          p.image ||
          "https://via.placeholder.com/80x80?text=No+Img"
      };
    });
  }, [cart.items, products]);

  // ESC closes drawer
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && open && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // Focus trap + initial focus
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    // Initial focus to close button for accessibility
    closeBtnRef.current?.focus();

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    drawer?.addEventListener("keydown", handleTab);
    return () => drawer?.removeEventListener("keydown", handleTab);
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden
        className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full sm:w-[440px] bg-white shadow-xl border-l
                    transition-transform duration-200 ease-out ${
                      open ? "translate-x-0" : "translate-x-full"
                    } flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Your Cart</h2>
          <button
            ref={closeBtnRef}
            className="text-slate-500 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md px-2 py-1"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {!enrichedItems.length ? (
            <EmptyState
              title="Your cart is empty"
              subtitle="Add some products to continue."
            />
          ) : (
            <ul className="divide-y">
              {enrichedItems.map((it) => (
                <li key={it.productId} className="py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-100 border"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/80x80?text=No+Img";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">
                        {it.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatINR(it.price)} × {it.qty}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <QuantityStepper
                        value={it.qty}
                        onChange={(v) =>
                          v === 0 ? onRemove(it.productId) : onQty(it.productId, v)
                        }
                      />
                      <button
                        className="text-xs text-slate-500 hover:text-red-600"
                        onClick={() => onRemove(it.productId)}
                        aria-label={`Remove ${it.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line subtotal */}
                  <div className="text-right text-sm text-slate-700 mt-2">
                    Subtotal:{" "}
                    <span className="font-medium">
                      {formatINR((it.price || 0) * it.qty)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Total</span>
            <strong className="text-slate-900">{formatINR(cart.total)}</strong>
          </div>
          <Button
            className="w-full"
            onClick={onCheckout}
            disabled={!enrichedItems.length}
          >
            Checkout
          </Button>
        </div>
      </aside>
    </div>
  );
}
