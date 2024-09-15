import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(params.id) },
    });
    if (!item) {
      return new NextResponse("Item not found", { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description } = await request.json();
    if (!name || !description) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const updatedItem = await prisma.item.update({
      where: { id: Number(params.id) },
      data: { name, description },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
