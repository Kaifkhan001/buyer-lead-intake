import prisma from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const buyers = await prisma.buyer.findMany();

        if(buyers.length == 0) return NextResponse.json({ message: "No buyers found", buyers: []}, { status: 200});

        console.log("All the user int he db:- ", buyers);

        return NextResponse.json({ message: "User fetched successfully", buyers}, { status: 200 });
    } catch (error) {
        console.log("Error while fetching all the buyers from the db", error);
        return NextResponse.json({ message: "Error fetching buyers from the db"}, { status: 406 });
    }
}