import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatRupiah } from "@/helpers/formatRupiah";
import { calcTotal } from "@/helpers/calcTotal";

const TransactionDetailModal = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <p>
              <b>No:</b> {data.trx_no}
            </p>
            <p>
              <b>Customer:</b> {data.customer.name}
            </p>
            <p>
              <b>Phone:</b> {data.customer.phone}
            </p>
            <p>
              <b>Tanggal:</b> {data.date}
            </p>
          </div>

          <div className="border rounded">
            {data.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between px-3 py-2 border-b last:border-b-0"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.code} × {item.qty}
                  </div>
                </div>
                <div>{formatRupiah(item.price * item.qty)}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatRupiah(calcTotal(data.items))}</span>
          </div>

          {data.notes && (
            <div className="text-sm text-muted-foreground">
              Catatan: {data.notes}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailModal;
