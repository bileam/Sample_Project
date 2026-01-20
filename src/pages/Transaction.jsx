import { useState } from "react";
import dummyTransactions from "@/data/dummy_transactions";
import TransactionTable from "@/components/transaction/TransactionTable";

const Transaction = () => {
  const [data] = useState(dummyTransactions);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Data Transaksi</h1>
      <TransactionTable data={data} />
    </div>
  );
};

export default Transaction;
