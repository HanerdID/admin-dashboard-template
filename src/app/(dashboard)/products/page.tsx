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
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Data dummy untuk produk
const products = [
  {
    id: "PROD-001",
    name: "Laptop Premium Pro",
    category: "Electronics",
    price: 1299.99,
    stock: 45,
    status: "in-stock",
  },
  {
    id: "PROD-002",
    name: "Ultra HD Smart TV",
    category: "Electronics",
    price: 749.99,
    stock: 28,
    status: "in-stock",
  },
  {
    id: "PROD-003",
    name: "Wireless Earbuds",
    category: "Audio",
    price: 89.99,
    stock: 120,
    status: "in-stock",
  },
  {
    id: "PROD-004",
    name: "Smart Watch Series 5",
    category: "Wearables",
    price: 199.99,
    stock: 34,
    status: "in-stock",
  },
  {
    id: "PROD-005",
    name: "Professional Camera",
    category: "Photography",
    price: 899.99,
    stock: 12,
    status: "low-stock",
  },
  {
    id: "PROD-006",
    name: "Gaming Console",
    category: "Gaming",
    price: 499.99,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "PROD-007",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 79.99,
    stock: 56,
    status: "in-stock",
  },
  {
    id: "PROD-008",
    name: "Tablet Pro 12",
    category: "Electronics",
    price: 649.99,
    stock: 23,
    status: "in-stock",
  },
  {
    id: "PROD-009",
    name: "Wireless Keyboard",
    category: "Accessories",
    price: 59.99,
    stock: 8,
    status: "low-stock",
  },
  {
    id: "PROD-010",
    name: "External Hard Drive 2TB",
    category: "Storage",
    price: 129.99,
    stock: 42,
    status: "in-stock",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Filter produk berdasarkan pencarian dan filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Mendapatkan kategori unik untuk dropdown filter
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

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
              <BreadcrumbLink>Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
                <DialogDescription>
                  Isi informasi produk baru di bawah ini
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Nama Produk
                  </label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right">
                    Kategori
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-right">
                    Harga
                  </label>
                  <Input id="price" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="stock" className="text-right">
                    Stok
                  </label>
                  <Input id="stock" type="number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan Produk</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Produk</h2>
        <p className="text-muted-foreground mt-1">
          Kelola produk dan inventaris Anda
        </p>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
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
              <DropdownMenuLabel>Filter Produk</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <label className="text-xs font-medium">Kategori</label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
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
                    <SelectItem value="in-stock">Tersedia</SelectItem>
                    <SelectItem value="low-stock">Stok Menipis</SelectItem>
                    <SelectItem value="out-of-stock">Habis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead className="text-right">Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Tidak ada produk yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "in-stock"
                            ? "default"
                            : product.status === "low-stock"
                            ? "outline"
                            : "destructive"
                        }
                        className={
                          product.status === "in-stock"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : product.status === "low-stock"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
                            : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                        }
                      >
                        {product.status === "in-stock"
                          ? "Tersedia"
                          : product.status === "low-stock"
                          ? "Stok Menipis"
                          : "Habis"}
                      </Badge>
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
                              navigator.clipboard.writeText(product.id)
                            }
                          >
                            Salin ID Produk
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
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
