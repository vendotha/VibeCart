export default function QuantityStepper({ value, onChange }) {
    return (
      <div className="inline-flex items-center rounded-xl border bg-white shadow-sm">
        <button aria-label="Decrease" className="px-3 py-1.5 disabled:opacity-50"
          onClick={() => onChange(Math.max(0, value - 1))}>−</button>
        <div className="w-10 text-center">{value}</div>
        <button aria-label="Increase" className="px-3 py-1.5"
          onClick={() => onChange(value + 1)}>＋</button>
      </div>
    );
  }
  