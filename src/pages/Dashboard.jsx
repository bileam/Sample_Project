import Cart from "../Components/Layout/Cart";
import logo from "../assets/people.svg";

import dummyTransaksi from "../Data/dummy_transactions.json";
import dummyItems from "../Data/Dummy_Items.json";
import dummyUsers from "../Data/Dummy_Users.json";
import TransactionChart from "@/Components/charts/TransactionChart";

const Dashboard = () => {
  // tanggal hari ini (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = today.slice(0, 7); // YYYY-MM

  // Transaksi hari ini
  const transaksiHariIni = dummyTransaksi.filter((trx) => trx.date === today);

  // Omzet bulan ini
  const omzetBulanIni = dummyTransaksi
    .filter((trx) => trx.date.startsWith(currentMonth))
    .reduce((total, trx) => {
      const trxTotal = trx.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      return total + trxTotal;
    }, 0);

  //Total user
  const totalUser = dummyUsers.length;
  //Total item
  const totalItem = dummyItems.length;

  const Carts = [
    {
      title: "Transaksi hari ini",
      img: logo,
      total: transaksiHariIni.length,
    },
    {
      title: "Omset Bulan ini",
      img: logo,
      total: omzetBulanIni,
    },
    {
      title: "Total User",
      img: logo,
      total: totalUser,
    },
    {
      title: "Total item Penjualan",
      img: logo,
      total: totalItem,
    },
  ];

  return (
    <div className="px-3 md:px-7 py-3 flex flex-col gap-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Carts.map((item, index) => (
          <Cart key={index} img={item.img} Total={item.total}>
            {item.title}
          </Cart>
        ))}
      </div>
      <div>
        <TransactionChart transactions={dummyTransaksi} />
      </div>
    </div>
  );
};

export default Dashboard;
