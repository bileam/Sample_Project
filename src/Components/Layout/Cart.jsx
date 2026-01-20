const Cart = ({ img, Total, children, warna }) => {
  return (
    <div className="p-3 py-2 min-h-20 bg-white shadow  rounded-md flex gap-2 items-center">
      <img src={img} alt="" className="p-2  rounded shadow" />
      <div className="flex flex-col justify-center">
        <h1 className="text-[0.9rem]">{children}</h1>
        <h1 className="font-bold text-[1.2srem]">{Total}</h1>
      </div>
    </div>
  );
};

export default Cart;
