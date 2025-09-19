import prisma from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {payload, userId} = await req.json();

        
        if(!payload) return NextResponse.json({ message: "Data not found"}, { status: 404});

        // const isBuyer = await prisma.buyer.findFirst({
        //     where: {
        //         phone: payload.phone
        //     }
        // });
        // console.log("Checking if user exist:- ", isBuyer);
        // if(isBuyer) return NextResponse.json({ message: "Entry already exists" }, { status: 409});

        const newBuyer = await prisma.buyer.create({
            data: {
                fullName: payload.fullName,
                email:    payload.email,
                phone :   payload.phone,
                city  :   payload.city,
                propertyType:  payload.propertyType,
                bhk :  payload.bhk,
                purpose:  payload.purpose,
                budgetMin : payload.budgetMin,
                budgetMax : payload.budgetMax,
                timeline  : payload.timeline,
                source    : payload.source,
                status : payload.status ?? "New",
                notes : payload.notes,
                tags   : payload.tags,    
                ownerId  : userId,
            }
        });

        return NextResponse.json({ message: "Buyer created Successfully", newBuyer}, { status: 201 });
    } catch (error) {
        console.log("Error creating buyer in the databse", error);
        return NextResponse.json({ message: "Something went wrong"}, { status: 405});
    }
}