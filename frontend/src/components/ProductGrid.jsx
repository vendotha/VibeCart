import ProductCard from "./ProductCard";
import Skeleton from "./Skeleton";
import EmptyState from "./EmptyState";

export default function ProductGrid({ products, loading, onAdd }) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-card border">
            <Skeleton className="rounded-xl aspect-[4/3]" />
            <Skeleton className="h-4 w-1/2 mt-3" />
            <Skeleton className="h-3 w-1/3 mt-2" />
            <Skeleton className="h-9 w-full mt-3" />
          </div>
        ))}
      </div>
    );
  }
  if (!products?.length) return <EmptyState title="No products" subtitle="Please check back later." />;
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
