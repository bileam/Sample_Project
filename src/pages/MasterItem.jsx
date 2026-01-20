import { useState } from "react";
import dummyItems from "@/data/Dummy_Items";
import ItemTable from "@/components/master-item/ItemTable";

const MasterItem = () => {
  const [items, setItems] = useState(dummyItems);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Master Item</h1>
      <ItemTable items={items} setItems={setItems} />
    </div>
  );
};

export default MasterItem;
