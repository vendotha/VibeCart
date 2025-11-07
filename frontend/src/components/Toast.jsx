import { useEffect, useState } from "react";
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = (msg, type="info") => setToasts(t => [...t, { id: crypto.randomUUID(), msg, type }]);
  const remove = (id) => setToasts(t => t.filter(x => x.id !== id));
  return { toasts, push, remove };
}
export default function ToastHost({ toasts, remove }) {
  useEffect(() => {
    const timers = toasts.map(t => setTimeout(() => remove(t.id), 2200));
    return () => timers.forEach(clearTimeout);
  }, [toasts]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 space-y-2 z-50">
      {toasts.map(t => (
        <div key={t.id}
          className="px-4 py-2 rounded-xl shadow-md bg-white border text-sm text-slate-800">
          {t.msg}
        </div>
      ))}
    </div>
  );
}
