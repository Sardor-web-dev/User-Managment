export type user =  {
    id: number;
    name: string;
    email: string;
    status: "Active" | "Inactive" | "Pending";
    role: "Admin" | "Editor" | "Viewer";
}