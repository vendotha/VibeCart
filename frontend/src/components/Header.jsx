import Button from "./Button";
export default function Header({ onOpenCart, count }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-bg/70 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-slate-800">Vibe Commerce</div>
        <Button onClick={onOpenCart} className="relative">
          Cart
          {count > 0 && (
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-white text-slate-800 px-2 text-xs">
              {count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
