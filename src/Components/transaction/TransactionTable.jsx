import { useState, useEffect } from "react";
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
import { calcTotal } from "@/helpers/calcTotal";
import TransactionDetailModal from "./TransactionDetailModal";

const ITEMS_PER_PAGE = 4;

const TransactionTable = ({ data }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTrx, setSelectedTrx] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  // FILTER DATA
  const filteredData = data.filter((trx) => {
    const matchSearch =
      trx.trx_no.toLowerCase().includes(search.toLowerCase()) ||
      trx.customer.name.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === "all" || trx.status === status;

    const trxDate = new Date(trx.date);
    const matchDate =
      (!startDate || trxDate >= new Date(startDate)) &&
      (!endDate || trxDate <= new Date(endDate));

    return matchSearch && matchStatus && matchDate;
  });

  // RESET PAGE SAAT FILTER BERUBAH
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, startDate, endDate]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      {/* FILTER */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search no transaksi / customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <select
          className="border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="cancel">Cancel</option>
        </select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No Transaksi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell>{trx.trx_no}</TableCell>
                <TableCell>{trx.date}</TableCell>
                <TableCell>
                  <div className="font-medium">{trx.customer.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {trx.customer.phone}
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(calcTotal(trx.items))}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      trx.status === "paid"
                        ? "default"
                        : trx.status === "unpaid"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {trx.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => setSelectedTrx(trx)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Data tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Button
            className="bg-[#0753b9] hover:bg-[#06449a] text-white"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}

          <Button
            className="bg-[#0753b9] hover:bg-[#06449a] text-white"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* DETAIL MODAL */}
      <TransactionDetailModal
        open={!!selectedTrx}
        onClose={() => setSelectedTrx(null)}
        data={selectedTrx}
      />
    </div>
  );
};

export default TransactionTable;
