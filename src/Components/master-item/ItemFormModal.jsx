import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ItemFormModal = ({ open, setOpen, setItems, initialData }) => {
  const [form, setForm] = useState({
    code: "",
    name: "",
    price: "",
    status: "active",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code,
        name: initialData.name,
        price: initialData.price,
        status: initialData.status,
      });
    } else {
      setForm({
        code: "",
        name: "",
        price: "",
        status: "active",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.code || !form.name || !form.price) {
      alert("Semua field wajib diisi");
      return;
    }

    if (initialData) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === initialData.id
            ? { ...item, ...form, price: Number(form.price) }
            : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: "itm_" + Date.now(),
          ...form,
          price: Number(form.price),
        },
      ]);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Item" : "Tambah Item"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Kode Item</Label>
            <Input name="code" value={form.code} onChange={handleChange} />
          </div>

          <div>
            <Label>Nama Item</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Harga</Label>
            <Input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Status</Label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            className={`bg-blue-500 hover:bg-blue-700`}
            onClick={handleSubmit}
          >
            {initialData ? "Update" : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemFormModal;
