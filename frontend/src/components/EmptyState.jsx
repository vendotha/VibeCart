export default function EmptyState({ title="Nothing here", subtitle="Start by adding a product." }) {
    return (
      <div className="text-center py-10 text-slate-500">
        <div className="mx-auto w-16 h-16 rounded-full bg-neutral-200 mb-4" />
        <h3 className="font-medium text-slate-700">{title}</h3>
        <p className="text-sm">{subtitle}</p>
      </div>
    );
  }
  