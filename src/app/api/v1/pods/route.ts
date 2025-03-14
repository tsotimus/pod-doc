import dbConnect from "@/lib/dbConnect";
import Pod from "@/models/Pod";
import { CreatePodSchema } from "@/types/pod";
import { createApiResponse, createErrorResponse, createZodErrorResponse } from "@/utils/server/responses";
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
    const body = await req.json() as unknown

    const validationResult = CreatePodSchema.safeParse(body)

    if (!validationResult.success) {
        return NextResponse.json(createZodErrorResponse(validationResult.error), {status: 400})
    }

    try{
        await dbConnect()
        const pod = await Pod.create(validationResult.data)
        return NextResponse.json(createApiResponse({data: pod}))
    } catch {
        return NextResponse.json(createErrorResponse(["Failed to create pod"]), {status: 500})
    }
}