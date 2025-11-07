import { cn } from "../utils/classNames";
export default function Button({ as: Comp="button", className="", ...props }) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
        "bg-accent text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-indigo-300",
        "disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition",
        className
      )}
      {...props}
    />
  );
}
