import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/helpers/formatRupiah";
import { exportToCSV } from "@/helpers/exportCsv";

const ITEMS_PER_PAGE = 5;

const ReportTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalTransaksi = data.length;
  const totalOmzet = data.reduce((sum, trx) => sum + trx.total, 0);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const csvData = data.map((trx) => ({
    trx_no: trx.trx_no,
    date: trx.date,
    customer: trx.customer,
    status: trx.status,
    total: trx.total,
  }));

  return (
    <div className="space-y-1 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="border rounded px-4 py-2">
          <p className="text-sm text-muted-foreground">Total Transaksi</p>
          <p className="text-2xl font-bold">{totalTransaksi}</p>
        </div>
        <div className="border rounded px-4 py-2">
          <p className="text-sm text-muted-foreground">Total Omzet</p>
          <p className="text-2xl font-bold">{formatRupiah(totalOmzet)}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-[#0753b9] hover:bg-[#06449a] w-full sm:w-auto"
          onClick={() => exportToCSV(csvData, "report-transaksi.csv")}
        >
          Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto rounded border">
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead>No Transaksi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell className="whitespace-nowrap">
                  {trx.trx_no}
                </TableCell>
                <TableCell>{trx.date}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {trx.customer}
                </TableCell>
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
                <TableCell className="whitespace-nowrap">
                  {formatRupiah(trx.total)}
                </TableCell>
              </TableRow>
            ))}

            {currentData.length === 0 && (
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
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex gap-2">
            <Button
              className="bg-[#0753b9] hover:bg-[#06449a] text-white"
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              className="bg-[#0753b9] hover:bg-[#06449a] text-white"
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportTable;
