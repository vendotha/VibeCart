import { cn } from "../utils/classNames";
export default function Card({ className="", ...props }) {
  return <div className={cn("bg-white rounded-2xl shadow-card border border-neutral-200", className)} {...props} />;
}
