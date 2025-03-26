import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/contexts/UserContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { user } from "@/types/user";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: user | null;
}

export default function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const { addUser, editUser } = useUsers();
  const isEditing = !!user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Pending" | "Active" | "Inactive">("Pending");
  const [role, setRole] = useState<"Viewer" | "Editor" | "Admin">("Viewer");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStatus(user.status as any);
      setRole(user.role as any);
    } else {
      setName("");
      setEmail("");
      setStatus("Pending");
      setRole("Viewer");
    }
  }, [user]);

  const handleSubmit = () => {
    if (!name || !email) return;

    if (isEditing) {
      editUser({ id: user!.id, name, email, status, role });
    } else {
      addUser({ name, email, status, role });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          </div>

          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Role</label>
              <Select value={role} onValueChange={(value) => setRole(value as any)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{isEditing ? "Save" : "Add User"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}