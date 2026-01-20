import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionChart = ({ transactions }) => {
  const paidTransactions = transactions.filter((trx) => trx.status === "paid");

  const chartData = paidTransactions.map((trx) => {
    const total = trx.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    return {
      date: trx.date,
      total,
    };
  });

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold mb-4 text-[#0753b9]">Omzet Transaksi</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#0753b9" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
