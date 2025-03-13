"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal, Plus, Search, Filter, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Data dummy untuk users
const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-10-15T10:30:00Z",
    avatar: "/avatars/01.png",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-10-18T14:20:00Z",
    avatar: "/avatars/02.png",
  },
  {
    id: "USR-003",
    name: "Michael Davis",
    email: "michael.davis@example.com",
    role: "viewer",
    status: "inactive",
    lastActive: "2023-09-20T11:15:00Z",
  },
  {
    id: "USR-004",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-10-19T09:45:00Z",
    avatar: "/avatars/04.png",
  },
  {
    id: "USR-005",
    name: "David Thompson",
    email: "david.t@example.com",
    role: "viewer",
    status: "pending",
    lastActive: "2023-10-10T16:30:00Z",
  },
  {
    id: "USR-006",
    name: "Jennifer Brown",
    email: "jennifer.brown@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-10-19T12:10:00Z",
    avatar: "/avatars/06.png",
  },
  {
    id: "USR-007",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-10-18T08:50:00Z",
  },
  {
    id: "USR-008",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    role: "viewer",
    status: "inactive",
    lastActive: "2023-08-25T15:45:00Z",
    avatar: "/avatars/08.png",
  },
  {
    id: "USR-009",
    name: "William Clark",
    email: "william.clark@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-10-17T10:15:00Z",
  },
  {
    id: "USR-010",
    name: "Catherine Lee",
    email: "catherine.lee@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-10-19T14:30:00Z",
    avatar: "/avatars/10.png",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Filter users berdasarkan pencarian dan filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Toggle selection untuk user
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Toggle selection untuk semua user
  const toggleAllSelection = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pengguna</h2>
          <p className="text-muted-foreground">
            Kelola pengguna dan hak akses mereka
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                <DialogDescription>
                  Isi informasi untuk membuat pengguna baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Nama
                  </label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    Peran
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih peran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <Select defaultValue="active">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Tambah Pengguna</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pengguna..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Pengguna</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <label className="text-xs font-medium">Peran</label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Semua Peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Peran</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2">
                <label className="text-xs font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectedUsers.length > 0 && (
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="text-red-600">
              Hapus ({selectedUsers.length})
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.length
                    }
                    onCheckedChange={toggleAllSelection}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Aktif</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Tidak ada pengguna yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-slate-500">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                            : user.role === "editor"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                            : "bg-slate-100 text-slate-800 hover:bg-slate-100 hover:text-slate-800"
                        }
                      >
                        {user.role === "admin"
                          ? "Administrator"
                          : user.role === "editor"
                          ? "Editor"
                          : "Viewer"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "inactive"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : user.status === "inactive"
                            ? "bg-slate-100 text-slate-800 hover:bg-slate-100 hover:text-slate-800"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
                        }
                      >
                        {user.status === "active"
                          ? "Aktif"
                          : user.status === "inactive"
                          ? "Tidak Aktif"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(user.id)
                            }
                          >
                            Salin ID Pengguna
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                          <DropdownMenuItem>Edit Pengguna</DropdownMenuItem>
                          <DropdownMenuItem>Ubah Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
