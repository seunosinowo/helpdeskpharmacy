"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowLeft, Download, Save, Receipt, User, MapPin, Calendar, Calculator, Banknote } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export default function NewInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState("");
  const [billTo, setBillTo] = useState("");
  const [address, setAddress] = useState("");
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [soldBy, setSoldBy] = useState("");
  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, amount: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = 0; // Tax is 0 for this specific layout
  const total = subtotal;
  const balanceDue = total - amountPaid;

  const handleSaveAndDownload = async () => {
    if (!billTo || !address || items.some((item) => !item.description)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber,
          date,
          billTo,
          address,
          items,
          subtotal,
          tax,
          total,
          amountPaid,
          balanceDue,
          soldBy,
          cashier,
        }),
      });

      if (response.ok) {
        toast.success("Invoice saved successfully");
        const invoiceData = await response.json();
        downloadPDF(invoiceData);
        router.push("/admin/invoices");
      } else {
        toast.error("Failed to save invoice");
      }
    } catch (error) {
      toast.error("An error occurred while saving the invoice");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = (invoice: any) => {
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

    // Logo (placeholder if not found, but we have logo.png)
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

    // --- Customer Info Box ---
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, 85, 180, 30); // Single wider box for customer

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 116, 139);
    doc.text("CUSTOMER:", 20, 92);

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.billTo.toUpperCase(), 20, 100, { maxWidth: 170 });
    doc.text(invoice.address, 20, 108, { maxWidth: 170 });

    // --- Items Table ---
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

    // --- Totals Section ---
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
    
    // Balance Due
    doc.setFillColor(241, 245, 249);
    doc.rect(totalsX, finalY + 30, 45, 10, "F");
    doc.rect(totalsX, finalY + 30, 45, 10);
    doc.rect(totalsX + 45, finalY + 30, 35, 10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 116, 139);
    doc.text("BALANCE DUE", totalsX + 3, finalY + 36);
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.balanceDue <= 0 ? "NO" : `N${invoice.balanceDue.toLocaleString()}`, totalsX + 48, finalY + 36);

    // --- Bottom Section (Sold By / Cashier) ---
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SOLD BY:", 15, finalY + 60);
    doc.text("CASHIER:", 130, finalY + 60);
    
    doc.setFont("helvetica", "normal");
    doc.text(invoice.soldBy || "Staff Member", 15, finalY + 68);
    doc.text(invoice.cashier || "Pharmacist", 130, finalY + 68);

    // --- Footer ---
    doc.setFillColor(26, 79, 139);
    doc.rect(0, 277, pageWidth, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("Warranty Terms and Conditions Apply", pageWidth - 15, 285, { align: "right" });
    doc.text("THANKS FOR YOUR PATRONAGE", pageWidth - 15, 292, { align: "right" });

    doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10 h-[600px]" />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/invoices")} className="rounded-full hover:bg-slate-100">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create New Invoice</h1>
              <p className="text-xs text-slate-500 font-medium">Drafting: {invoiceNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/admin/invoices")} className="hidden sm:flex border-slate-200">
              Cancel
            </Button>
            <Button onClick={handleSaveAndDownload} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save & Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Basic Info Section */}
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/70 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Invoice Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Calculator className="h-3 w-3" /> Invoice Number
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="bg-white/50 border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-white/50 border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="billTo" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <User className="h-3 w-3" /> Bill To
                  </Label>
                  <Input
                    id="billTo"
                    placeholder="Customer Name"
                    value={billTo}
                    onChange={(e) => setBillTo(e.target.value)}
                    className="bg-white/50 border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Customer Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white/50 border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Staff Info Section */}
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/70 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Staff Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="soldBy" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    Sold By
                  </Label>
                  <Input
                    id="soldBy"
                    placeholder="Name of staff"
                    value={soldBy}
                    onChange={(e) => setSoldBy(e.target.value)}
                    className="bg-white/50 border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashier" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    Cashier
                  </Label>
                  <Input
                    id="cashier"
                    placeholder="Name of cashier"
                    value={cashier}
                    onChange={(e) => setCashier(e.target.value)}
                    className="bg-white/50 border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Items Table Section */}
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/70 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-blue-600" />
                    Items List
                  </CardTitle>
                  <Button onClick={addItem} size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-50/80 text-slate-500 font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Item Description</th>
                        <th className="px-6 py-4 text-center w-24">Qty</th>
                        <th className="px-6 py-4 text-center w-32">Price (₦)</th>
                        <th className="px-6 py-4 text-right w-32">Amount</th>
                        <th className="px-6 py-4 text-center w-16"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <Input
                              placeholder="Describe product or service"
                              value={item.description}
                              onChange={(e) => updateItem(item.id, "description", e.target.value)}
                              className="border-none shadow-none bg-transparent focus:ring-0 p-0 text-slate-900 font-medium placeholder:text-slate-300"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                              className="text-center bg-white border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                              className="text-center bg-white border-slate-200 rounded-lg"
                            />
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900">
                            ₦{item.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-slate-900 text-white sticky top-28">
              <CardHeader className="border-b border-slate-800">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="bg-blue-500/10 p-1.5 rounded text-blue-400 font-bold text-sm h-6 w-6 flex items-center justify-center">₦</div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-white">₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amountPaid" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Amount Paid
                    </Label>
                    <Input
                      id="amountPaid"
                      type="number"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                      className="bg-slate-800 border-slate-700 text-white focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-800">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Balance Due</p>
                      <h3 className={`text-3xl font-black tracking-tight ${balanceDue > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        ₦{balanceDue.toFixed(2)}
                      </h3>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-800/50 flex flex-col gap-3 p-6">
                <Button onClick={handleSaveAndDownload} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold">
                   <Download className="mr-2 h-5 w-5" /> Download PDF
                </Button>
                <p className="text-[10px] text-center text-slate-500 italic">
                  By downloading, you agree to store this record in the secure database.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
