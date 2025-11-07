import Card from "./Card";
import Button from "./Button";
import { formatINR } from "../utils/currency";

export default function ProductCard({ product, onAdd }) {
  return (
    <Card className="p-4 hover:shadow-md transition">
<img
  src={product.image}
  alt={product.name}
  onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
  className="aspect-[4/3] w-full object-cover rounded-xl mb-3"
/>
      <div className="text-slate-800 font-medium">{product.name}</div>
      <div className="text-slate-600 text-sm mt-1">{formatINR(product.price)}</div>
      <Button className="mt-3 w-full" onClick={() => onAdd(product.id)}>Add to Cart</Button>
    </Card>
  );
}
