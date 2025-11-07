import { formatINR } from "../utils/currency";
import QuantityStepper from "./QuantityStepper";

export default function CartItemRow({ item, onQty, onRemove }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        
        {/* Product Thumbnail */}
        <img
          src={item.product?.image}
          alt={item.product?.name || "Product image"}
          className="w-12 h-12 rounded-lg object-cover bg-neutral-100"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/80x80?text=No+Img";
          }}
        />

        {/* Product Info */}
        <div>
          <div className="text-slate-800 text-sm font-medium">
            {item.product?.name || item.productId}
          </div>
          <div className="text-slate-500 text-xs">
            {formatINR(item.product?.price || 0)} × {item.qty}
          </div>
        </div>
      </div>

      {/* Quantity + Remove */}
      <div className="flex items-center gap-3">
        <QuantityStepper
          value={item.qty}
          onChange={(v) =>
            v === 0 ? onRemove(item.productId) : onQty(item.productId, v)
          }
        />

        <button
          className="text-sm text-slate-500 hover:text-red-600"
          onClick={() => onRemove(item.productId)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
