import { useApi } from "@/hooks/useApi";
import { method } from "@/types/methodsApi";
import { user } from "@/types/user";
import { UsersContextType } from "@/types/userContextType";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<user[]>([]);
  const { fetchData, error, } = useApi(import.meta.env.VITE_PUBLIC_API);

  useEffect(() => {
    fetchData("", method.get).then((res) =>
      setUsers(res?.data)
    );
  }, []);
  <>
  <li>{error}</li>
  </>

  const addUser = (user: Omit<user, "id">) => {
    const newUser = { id: Date.now(), ...user };
    setUsers((prev) => [...prev, newUser]);
  };

  const editUser = (updatedUser: user) => {
    setUsers((prev) =>
      prev.map((user: user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
