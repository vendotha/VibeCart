import Button from "./Button";
import { formatINR } from "../utils/currency";

export default function ReceiptDialog({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
      <div role="dialog" aria-modal="true"
           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-5">
        <h3 className="text-lg font-semibold text-slate-800">Receipt</h3>
        <div className="mt-3 space-y-1 text-sm text-slate-700">
          <div><span className="text-slate-500">ID:</span> {receipt.receiptId}</div>
          <div><span className="text-slate-500">Name:</span> {receipt.name}</div>
          <div><span className="text-slate-500">Email:</span> {receipt.email}</div>
          <div><span className="text-slate-500">Total:</span> {formatINR(receipt.total)}</div>
          <div><span className="text-slate-500">Timestamp:</span> {new Date(receipt.timestamp).toLocaleString()}</div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button onClick={() => navigator.clipboard.writeText(receipt.receiptId)} className="flex-1">Copy ID</Button>
          <Button onClick={onClose} className="flex-1">Close</Button>
        </div>
      </div>
    </div>
  );
}
