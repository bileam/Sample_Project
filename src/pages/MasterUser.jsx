import { useState } from "react";
import dummyUsers from "@/data/dummy_users";
import UserTable from "@/Components/Master-user/UserTable.jsx";

const MasterUser = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = role === "all" || user.role === role;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Master User</h1>
      <UserTable
        users={filteredUsers}
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        setUsers={setUsers}
      />
    </div>
  );
};

export default MasterUser;
