import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import UserFormModal from "./UserFormModal";
import ConfirmDelete from "./ConfirmDelete";

const ITEMS_PER_PAGE = 5;

const UserTable = ({ users, setUsers }) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //  filter
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = role === "all" || u.role === role;
      return matchSearch && matchRole;
    });
  }, [users, search, role]);

  // pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* FILTER & ACTION */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Search nama / email"
            value={search}
            onChange={handleSearch}
            className="sm:max-w-xs"
          />

          <select
            className="h-10 rounded-md border px-3 text-sm"
            value={role}
            onChange={handleRole}
          >
            <option value="all">All Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <Button
          className="bg-[#0753b9] hover:bg-[#06449a] w-full sm:w-auto"
          onClick={() => {
            setSelectedUser(null);
            setOpenForm(true);
          }}
        >
          + Add User
        </Button>
      </div>
      {/* TABLE */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    } items-center`}
                    // variant={user.status === "active" ? "" : "destructive"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedId(user.id);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Data tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 ">
          <Button
            className="bg-[#0753b9] hover:bg-[#06449a] text-white"
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
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
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
      <UserFormModal
        open={openForm}
        setOpen={setOpenForm}
        setUsers={setUsers}
        initialData={selectedUser}
      />
      <ConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        onConfirm={() => {
          setUsers((prev) => prev.filter((u) => u.id !== selectedId));
          setOpenDelete(false);
        }}
      />
    </div>
  );
};

export default UserTable;
