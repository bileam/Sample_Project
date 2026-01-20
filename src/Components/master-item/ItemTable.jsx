import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/helpers/formatRupiah";

import ItemFormModal from "./ItemFormModal";
import ConfirmDelete from "./ConfirmDelete";

const ItemTable = ({ items, setItems }) => {
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // FILTER
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Input
          placeholder="Search kode / nama item"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />

        <Button
          className="bg-[#0753b9] hover:bg-[#06449a] w-full sm:w-auto"
          onClick={() => {
            setSelectedItem(null);
            setOpenForm(true);
          }}
        >
          Add Items
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Item</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatRupiah(item.price)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "active" ? "default" : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedItem(item);
                      setOpenForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedId(item.id);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginatedItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Data tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              className="rounded-xl px-5 bg-blue-600 hover:bg-blue-700"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const isActive = page === pageNumber;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`w-10 h-10 rounded-xl border text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <Button
              className="rounded-xl px-5 bg-blue-600 hover:bg-blue-700"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <ItemFormModal
        open={openForm}
        setOpen={setOpenForm}
        setItems={setItems}
        initialData={selectedItem}
      />

      <ConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        onConfirm={() => {
          setItems((prev) => prev.filter((i) => i.id !== selectedId));
          setOpenDelete(false);
        }}
      />
    </div>
  );
};

export default ItemTable;
