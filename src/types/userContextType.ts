import { user } from "./user";

export type UsersContextType = {
    users: user[];
    addUser: (user: Omit<user, "id">) => void;
    editUser: (user: user) => void;
    deleteUser: (id: number) => void;
  };