import prisma from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    console.log("Signup data from frontend:", { name, email });

    const isUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: { email, name },
    });

    console.log("User signed up:", user);
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in the Signup Route:", error);
    return NextResponse.json(
      { message: "Error while signing up the user" },
      { status: 500 }
    );
  }
}
