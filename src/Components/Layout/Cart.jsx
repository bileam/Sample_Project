// Cart.jsx

const COLOR_MAP = {
  "red-500": {
    bg: "bg-red-500",
    shadow: "hover:shadow-red-500",
  },
  "blue-500": {
    bg: "bg-blue-500",
    shadow: "hover:shadow-blue-500",
  },
  "green-500": {
    bg: "bg-green-500",
    shadow: "hover:shadow-green-500",
  },
  "yellow-500": {
    bg: "bg-yellow-500",
    shadow: "hover:shadow-yellow-500",
  },
};

const Cart = ({ img, Total, children, color = "red-500" }) => {
  const currentColor = COLOR_MAP[color] || COLOR_MAP["red-500"];

  return (
    <div
      className={`
        p-3 py-2 min-h-20 bg-white shadow transition-all duration-300
        rounded-md flex gap-2 items-center
        hover:shadow-2xl ${currentColor.shadow}
      `}
    >
      <img
        src={img}
        alt=""
        className={`p-2 rounded shadow ${currentColor.bg}`}
      />

      <div className="flex flex-col justify-center">
        <h1 className="text-[0.9rem]">{children}</h1>
        <h1 className="font-bold text-[1.2rem]"> {Total}</h1>
      </div>
    </div>
  );
};

export default Cart;
