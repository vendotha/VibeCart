import { useState } from "react";
import Button from "./Button";

export default function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form className="bg-white rounded-2xl shadow-card border p-4 space-y-3"
      onSubmit={(e) => { e.preventDefault(); onSubmit({ name, email }); }}>
      <h2 className="text-lg font-semibold text-slate-800">Checkout</h2>
      <input className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
             placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required />
      <input className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
             type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required />
      <Button type="submit" className="w-full">Place Order</Button>
    </form>
  );
}
