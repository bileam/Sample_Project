import Cart from "../Components/Layout/Cart";
import logo from "../assets/people.svg";
import logo1 from "../assets/icont/report.svg";

import dummyTransaksi from "../Data/dummy_transactions.json";
import dummyItems from "../Data/Dummy_Items.json";
import dummyUsers from "../Data/Dummy_Users.json";
import TransactionChart from "@/Components/charts/TransactionChart";

const Dashboard = () => {
  // tanggal hari ini (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = today.slice(0, 7);

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
      img: logo1,
      total: transaksiHariIni.length,
      warna: "blue-500",
    },
    {
      title: "Omset Bulan ini",
      img: logo1,
      total: omzetBulanIni,
      warna: "yellow-500",
    },
    {
      title: "Total User",
      img: logo1,
      total: totalUser,
      warna: "red-500",
    },
    {
      title: "Total item Penjualan",
      img: logo1,
      total: totalItem,
      warna: "green-500",
    },
  ];

  return (
    <div className="px-3 md:px-7 py-3 flex flex-col gap-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Carts.map((item, index) => (
          <Cart
            key={index}
            img={item.img}
            Total={item.total}
            color={item.warna}
          >
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
