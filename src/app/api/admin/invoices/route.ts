import { NextResponse } from "next/server";
import { cors } from "@/lib/cors";
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

    const headers = cors(request);
    return new NextResponse(JSON.stringify(invoice), { status: 200, headers });
  } catch (error) {
    console.error("Error creating invoice:", error);
    const headers = cors(request);
    return new NextResponse(JSON.stringify({ error: "Failed to create invoice" }), { status: 500, headers });
  }
}

export async function GET(request: Request) {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = cors(request);
    return new NextResponse(JSON.stringify(invoices), { status: 200, headers });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    const headers = cors(request);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch invoices" }), { status: 500, headers });
  }
}
