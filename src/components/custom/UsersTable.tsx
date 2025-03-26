import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUsers } from "@/contexts/UserContext";
import UserModal from "./UserModal";
import { Skeleton } from "@/components/ui/skeleton"; 
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { user } from "@/types/user";

export default function UsersTable() {
  const { users, deleteUser } = useUsers();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Users");
  const [selectedUser, setSelectedUser] = useState<user | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); 
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); 
      }
    };

    loadData();
  }, []);

  const openModal = (user: user | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Users" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = (id: number) => {
    deleteUser(id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage your users, their roles and permissions</p>
        </div>
        <Button onClick={() => openModal(null)} className="ml-auto cursor-pointer"><IoIosAddCircleOutline /> Add User</Button>
      </div>

      <div className="relative mb-4">
        <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input 
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10" 
        />
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-4">
        <TabsList className="inline-flex space-x-2">
          <TabsTrigger value="All Users">All Users</TabsTrigger>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="Inactive">Inactive</TabsTrigger>
          <TabsTrigger value="Pending">Pending</TabsTrigger>
        </TabsList>
      </Tabs>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(5)
              .fill(null)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      user.status === "Active"
                        ? "bg-green-500 text-white"
                        : user.status === "Inactive"
                        ? "bg-gray-300 text-black"
                        : "border border-orange-500 text-orange-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => openModal(user)}><MdModeEdit /> Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}><RiDeleteBin6Line />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {isModalOpen && <UserModal isOpen={isModalOpen} onClose={closeModal} user={selectedUser} />}
    </div>
  );
}