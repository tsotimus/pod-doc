import dbConnect from "@/lib/dbConnect";
import Pod from "@/models/Pod";
import { createApiResponse, createErrorResponse } from "@/utils/server/responses";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {

    try{
        await dbConnect();
        const pods = await Pod.find({})
        return NextResponse.json(createApiResponse({data: pods}))
    } catch {
        return NextResponse.json(createErrorResponse(["Failed to fetch pods"]), {status: 500})
    }
}

export const POST = async (req: NextRequest) => {
    //TODO: Implement
}