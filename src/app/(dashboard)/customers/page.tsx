"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";

// Data dummy untuk customers
const customers = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    lastActive: "2023-10-15T10:30:00Z",
    orders: 12,
    totalSpent: 1250.6,
    type: "retail",
    createdAt: "2023-01-10T08:45:00Z",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    lastActive: "2023-10-18T14:20:00Z",
    avatar: "/avatars/02.png",
    orders: 8,
    totalSpent: 876.2,
    type: "retail",
    createdAt: "2023-02-15T09:30:00Z",
  },
  {
    id: "CUST-003",
    name: "Michael Davis",
    email: "michael.davis@example.com",
    status: "inactive",
    lastActive: "2023-09-20T11:15:00Z",
    orders: 4,
    totalSpent: 450.75,
    type: "retail",
    createdAt: "2023-03-05T15:20:00Z",
  },
  {
    id: "CUST-004",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    status: "active",
    lastActive: "2023-10-19T09:45:00Z",
    avatar: "/avatars/04.png",
    orders: 15,
    totalSpent: 1820.3,
    type: "wholesale",
    createdAt: "2023-01-22T10:15:00Z",
  },
  {
    id: "CUST-005",
    name: "David Thompson",
    email: "david.t@example.com",
    status: "pending",
    lastActive: "2023-10-10T16:30:00Z",
    orders: 0,
    totalSpent: 0,
    type: "retail",
    createdAt: "2023-10-05T14:30:00Z",
  },
  {
    id: "CUST-006",
    name: "Jennifer Brown",
    email: "jennifer.brown@example.com",
    status: "active",
    lastActive: "2023-10-19T12:10:00Z",
    avatar: "/avatars/06.png",
    orders: 9,
    totalSpent: 1120.8,
    type: "partner",
    createdAt: "2023-02-28T11:45:00Z",
  },
  {
    id: "CUST-007",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    status: "active",
    lastActive: "2023-10-18T08:50:00Z",
    orders: 6,
    totalSpent: 780.4,
    type: "retail",
    createdAt: "2023-04-17T09:20:00Z",
  },
  {
    id: "CUST-008",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    status: "inactive",
    lastActive: "2023-08-25T15:45:00Z",
    avatar: "/avatars/08.png",
    orders: 3,
    totalSpent: 350.25,
    type: "retail",
    createdAt: "2023-05-10T13:15:00Z",
  },
  {
    id: "CUST-009",
    name: "William Clark",
    email: "william.clark@example.com",
    status: "active",
    lastActive: "2023-10-17T10:15:00Z",
    orders: 11,
    totalSpent: 1450.9,
    type: "wholesale",
    createdAt: "2023-03-12T08:30:00Z",
  },
  {
    id: "CUST-010",
    name: "Catherine Lee",
    email: "catherine.lee@example.com",
    status: "active",
    lastActive: "2023-10-19T14:30:00Z",
    avatar: "/avatars/10.png",
    orders: 7,
    totalSpent: 920.15,
    type: "partner",
    createdAt: "2023-06-20T11:10:00Z",
  },
];

// Definisi kolom tabel
export const columns: ColumnDef<(typeof customers)[0]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>
              {customer.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{customer.name}</span>
            <span className="text-xs text-slate-500">{customer.email}</span>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "inactive"
              ? "secondary"
              : "outline"
          }
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
              : status === "inactive"
              ? "bg-slate-100 text-slate-800 hover:bg-slate-100 hover:text-slate-800"
              : "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
          }
        >
          {status === "active"
            ? "Aktif"
            : status === "inactive"
            ? "Tidak Aktif"
            : "Pending"}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "orders",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pesanan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("orders")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Belanja
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSpent"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type === "retail"
            ? "Retail"
            : type === "wholesale"
            ? "Grosir"
            : "Partner"}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastActive",
    header: "Terakhir Aktif",
    cell: ({ row }) => {
      const lastActive = new Date(row.getValue("lastActive") as string);
      return (
        <div className="text-sm text-slate-500">
          {lastActive.toLocaleDateString()}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
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
              onClick={() => navigator.clipboard.writeText(customer.id)}
            >
              Salin ID pelanggan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat detail</DropdownMenuItem>
            <DropdownMenuItem>Lihat pesanan</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function CustomersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  // Filter customers berdasarkan status
  const filteredCustomers = React.useMemo(() => {
    if (statusFilter === "all") return customers;
    return customers.filter((customer) => customer.status === statusFilter);
  }, [statusFilter]);

  const table = useReactTable({
    data: filteredCustomers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Handle delete selected customers
  const handleDeleteSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const count = selectedRows.length;

    if (count === 0) return;

    toast.success(
      `${count} pelanggan ${count > 1 ? "telah" : "telah"} dihapus`,
      {
        description: "Pelanggan yang dipilih telah berhasil dihapus.",
      }
    );

    // Reset selection after delete
    table.resetRowSelection();
  };

  // Handle add new customer
  const handleAddCustomer = (event: React.FormEvent) => {
    event.preventDefault();

    toast.success("Pelanggan ditambahkan", {
      description: "Pelanggan baru telah berhasil ditambahkan.",
    });

    setIsAddCustomerOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Customers</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pelanggan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
              <DialogDescription>
                Isi informasi untuk pelanggan baru.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCustomer}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nama
                  </Label>
                  <Input id="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipe
                  </Label>
                  <Select defaultValue="retail">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Grosir</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Tambah Pelanggan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pelanggan</h2>
        <p className="text-muted-foreground mt-1">
          Kelola pelanggan dan informasi kontak mereka
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Cari pelanggan..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "name"
                        ? "Pelanggan"
                        : column.id === "totalSpent"
                        ? "Total Belanja"
                        : column.id === "lastActive"
                        ? "Terakhir Aktif"
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="outline"
              className="h-9 gap-1 text-red-600"
              onClick={handleDeleteSelected}
            >
              <Trash className="h-4 w-4" />
              Hapus ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Tidak ada hasil.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} baris dipilih.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Berikutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
