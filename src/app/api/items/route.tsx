import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const newItem = await prisma.item.create({
    data: { name, description },
  });
  return NextResponse.json(newItem);
}
