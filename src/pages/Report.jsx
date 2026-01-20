import { useState } from "react";
import { Input } from "@/components/ui/input";
import ReportTable from "@/components/report/ReportTable";
import { calcTotal } from "@/helpers/calcTotal";

// dummy dari transaksi
import dummyTransactions from "@/data/dummy_transactions";

const Report = () => {
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const reportData = dummyTransactions
    .filter((trx) => {
      const trxDate = new Date(trx.date);

      const matchStatus = status === "all" || trx.status === status;

      const matchDate =
        (!startDate || trxDate >= new Date(startDate)) &&
        (!endDate || trxDate <= new Date(endDate));

      return matchStatus && matchDate;
    })
    .map((trx) => ({
      id: trx.id,
      trx_no: trx.trx_no,
      date: trx.date,
      customer: trx.customer.name,
      status: trx.status,
      total: calcTotal(trx.items),
    }));

  return (
    <div className="">
      <h1 className="text-xl font-bold px-5">Report Transaksi</h1>

      {/* FILTER */}
      <div className="flex flex-wrap gap-1 px-5">
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

      {/* TABLE + SUMMARY */}
      <ReportTable data={reportData} />
    </div>
  );
};

export default Report;
