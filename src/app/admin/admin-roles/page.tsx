"use client";
import { useState } from "react";
import AdminRolesHeader from "@/components/admin/admin-roles/AdminRolesHeader";
import AdminRolesTable, {
  AdminRow,
} from "@/components/admin/admin-roles/AdminRolesTable";
import AddAdminModal from "@/components/admin/admin-roles/AddAdminModal";
import EditAccessModal from "@/components/admin/admin-roles/EditAccessModal";
import RemoveAdminModal from "@/components/admin/admin-roles/RemoveAdminModal";

const admins: AdminRow[] = [
  {
    id: "1",
    name: "Albert Flores (You)",
    role: "Super Admin",
    email: "albertflores@mail.com",
    access: "Dashboard, Users, Challenges, +4 others",
    avatarUrl: "/work.jpg",
  },
  {
    id: "2",
    name: "Eleanor Pena",
    role: "Community Support",
    email: "eleanorpena@mail.com",
    access: "Dashboard, Users, Challenges, +4 others",
    avatarUrl: "/work.jpg",
  },
  {
    id: "3",
    name: "Wade Warren",
    role: "Growth Manager",
    email: "wadewarren@mail.com",
    access: "Dashboard, Users, Challenges, +4 others",
    avatarUrl: "/work.jpg",
  },
];

export default function AdminRolesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editRow, setEditRow] = useState<AdminRow | null>(null);
  const [removeRow, setRemoveRow] = useState<AdminRow | null>(null);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm">
        <AdminRolesHeader onAdd={() => setIsAddOpen(true)} />
        <AdminRolesTable
          admins={admins}
          onEditAccess={(row) => setEditRow(row)}
          onRemove={(row) => setRemoveRow(row)}
        />
      </div>

      <AddAdminModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={() => {}}
      />
      <EditAccessModal
        open={!!editRow}
        onClose={() => setEditRow(null)}
        adminName={editRow?.name || ""}
        currentAccess={["dashboard", "users", "challenges"]}
        onSave={() => {}}
      />
      <RemoveAdminModal
        open={!!removeRow}
        onClose={() => setRemoveRow(null)}
        adminName={removeRow?.name || ""}
        avatarUrl={removeRow?.avatarUrl}
        onConfirm={() => {}}
      />
    </div>
  );
}
