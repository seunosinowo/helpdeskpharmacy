import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      invoiceNumber, 
      billTo, 
      address, 
      items, 
      subtotal, 
      tax, 
      total,
      amountPaid,
      balanceDue,
      soldBy,
      cashier
    } = data;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        billTo,
        address,
        items,
        subtotal,
        tax,
        total,
        amountPaid: parseFloat(amountPaid) || 0,
        balanceDue: parseFloat(balanceDue) || 0,
        soldBy,
        cashier,
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}
