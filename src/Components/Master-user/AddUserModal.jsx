import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddUserModal = ({ open, setOpen, setUsers }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "staff",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setUsers((prev) => [
      ...prev,
      {
        id: `usr_${Date.now()}`,
        ...form,
        created_at: new Date().toISOString(),
      },
    ]);

    setOpen(false);
    setForm({ name: "", email: "", role: "staff", status: "active" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full border rounded px-3 py-2"
            value={form.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          <select
            name="status"
            className="w-full border rounded px-3 py-2"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
