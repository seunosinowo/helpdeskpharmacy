"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Download, FileText, LayoutDashboard, History } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  billTo: string;
  address: string;
  items: any;
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  soldBy?: string;
  cashier?: string;
  createdAt: string;
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/invoices");
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        toast.error("Failed to fetch invoices");
      }
    } catch (error) {
      toast.error("An error occurred while fetching invoices");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = (invoice: Invoice) => {
    const doc = new jsPDF();
    const pageWidth = 210;
    
    // --- Header Section ---
    // Blue stripe at top
    doc.setFillColor(26, 79, 139); // Dark blue
    doc.rect(0, 0, pageWidth, 20, "F");
    
    // Angled light blue accent
    doc.setFillColor(58, 154, 217); // Light blue
    doc.triangle(100, 0, 140, 0, 120, 20, "F");
    doc.rect(120, 0, 90, 20, "F");

    // Logo
    try {
      doc.addImage("/logo.png", "PNG", 15, 25, 30, 15);
    } catch (e) {
      doc.setFontSize(20);
      doc.setTextColor(26, 79, 139);
      doc.text("PHARMACY", 15, 35);
    }

    // Company Name
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("HELPDESK PHARMACY", 15, 45);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("INT'L. LTD.", 15, 49);
    doc.setFontSize(7);
    doc.text("Quality Healthcare Products", 15, 53);

    // Website Contact Info (Header right)
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "bold");
    doc.text("CONTACT US", 140, 28);
    doc.setFont("helvetica", "normal");
    doc.text("8, Dr Chimezie street, Chevy view estate", 140, 32);
    doc.text("Chevron Drive Off Lekki, Lagos", 140, 36);
    doc.text("Tel: +2347082272277", 140, 40);
    doc.text("Email: chioma.ugwoke@helpdeskpharmacy.com", 140, 44);

    // Sales Invoice Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SALES INVOICE", 195, 60, { align: "right" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 195, 68, { align: "right" });
    doc.text(`Date: ${new Date(invoice.date).toDateString()}`, 195, 73, { align: "right" });

    // Customer Info Box
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, 85, 180, 30);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 116, 139);
    doc.text("CUSTOMER:", 20, 92);

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.billTo.toUpperCase(), 20, 100, { maxWidth: 170 });
    doc.text(invoice.address, 20, 108, { maxWidth: 170 });

    // Items Table
    const tableData = invoice.items.map((item: any, index: number) => [
      index + 1,
      item.description.toUpperCase(),
      item.quantity,
      item.unitPrice.toLocaleString(),
      item.amount.toLocaleString(),
    ]);

    autoTable(doc, {
      startY: 125,
      head: [["ITEM NO.", "DESCRIPTION", "QTY", "UNIT PRICE \n (N)", "AMOUNT \n (N)"]],
      body: tableData,
      theme: "grid",
      headStyles: { 
        fillColor: [241, 245, 249], 
        textColor: [15, 23, 42],
        fontSize: 8,
        halign: "left",
        lineWidth: 0.1,
        lineColor: [200, 200, 200]
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        font: "helvetica",
        textColor: [15, 23, 42],
        lineWidth: 0.1,
        lineColor: [200, 200, 200]
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 80 },
        2: { cellWidth: 20 },
        3: { cellWidth: 35 },
        4: { cellWidth: 30 },
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 130;

    // Totals Section
    const totalsWidth = 80;
    const totalsX = pageWidth - 15 - totalsWidth;
    
    const drawTotalRow = (label: string, value: string, y: number) => {
      doc.setFillColor(241, 245, 249);
      doc.rect(totalsX, y, 45, 10, "F");
      doc.rect(totalsX, y, 45, 10);
      doc.rect(totalsX + 45, y, 35, 10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 116, 139);
      doc.text(label, totalsX + 3, y + 6);
      doc.setTextColor(15, 23, 42);
      doc.text(`N${value}`, totalsX + 48, y + 6);
    };

    drawTotalRow("SUB TOTAL", invoice.subtotal.toLocaleString(), finalY + 10);
    drawTotalRow("AMOUNT PAID", invoice.amountPaid.toLocaleString(), finalY + 20);
    
    doc.setFillColor(241, 245, 249);
    doc.rect(totalsX, finalY + 30, 45, 10, "F");
    doc.rect(totalsX, finalY + 30, 45, 10);
    doc.rect(totalsX + 45, finalY + 30, 35, 10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 116, 139);
    doc.text("BALANCE DUE", totalsX + 3, finalY + 36);
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.balanceDue <= 0 ? "NO" : `N${invoice.balanceDue.toLocaleString()}`, totalsX + 48, finalY + 36);

    // Bottom Section
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SOLD BY:", 15, finalY + 60);
    doc.text("CASHIER:", 130, finalY + 60);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.soldBy || "Staff Member", 15, finalY + 68);
    doc.text(invoice.cashier || "Pharmacist", 130, finalY + 68);

    // Footer
    doc.setFillColor(26, 79, 139);
    doc.rect(0, 277, pageWidth, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("Warranty Terms and Conditions Apply", pageWidth - 15, 285, { align: "right" });
    doc.text("THANKS FOR YOUR PATRONAGE", pageWidth - 15, 292, { align: "right" });

    doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Pharmacy Helpdesk</h1>
              <p className="text-sm text-gray-500 font-medium">Invoice Management</p>
            </div>
          </div>
          <Button onClick={() => router.push("/admin/invoices/new")} className="bg-blue-600 hover:bg-blue-700 shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Generate Invoice
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold">{invoices.length}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <LayoutDashboard className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold">
                  ₦{invoices.reduce((acc, inv) => acc + inv.total, 0).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Last Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <History className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-lg font-bold">
                  {invoices.length > 0 ? new Date(invoices[0].createdAt).toLocaleDateString() : "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>View and manage your previous invoices</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4 opacity-20" />
                <p className="text-gray-500 font-medium">No invoices found. Generate your first invoice!</p>
              </div>
            ) : (
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-bold">Invoice No</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="font-bold">Bill To</TableHead>
                      <TableHead className="font-bold text-right">Total Amount</TableHead>
                      <TableHead className="font-bold text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell className="font-mono font-medium text-blue-600">{invoice.invoiceNumber}</TableCell>
                        <TableCell className="text-gray-600">{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium text-gray-900">{invoice.billTo}</TableCell>
                        <TableCell className="text-right font-bold text-gray-900">₦{invoice.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => downloadPDF(invoice)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100/50"
                          >
                            <Download className="mr-2 h-4 w-4" /> PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
