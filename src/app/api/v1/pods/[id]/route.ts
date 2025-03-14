import dbConnect from "@/lib/dbConnect"
import Pod from "@/models/Pod"
import { UpdatePodSchema } from "@/types/pod"
import { createZodErrorResponse, createErrorResponse, createApiResponse } from "@/utils/server/responses"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const body = await req.json() as unknown
    // eslint-disable-next-line @typescript-eslint/await-thenable -- This is a nextjs quirk
    const {id} = await params

    const validationResult = UpdatePodSchema.safeParse(body)

    if (!validationResult.success) {
        return NextResponse.json(createZodErrorResponse(validationResult.error), {status: 400})
    }

    try{
        await dbConnect()
        const pod = await Pod.findOne({_id:id})



        if (!pod) {
            return NextResponse.json(createErrorResponse(["Pod not found"]), {status: 404})
        }

        pod.widgets = validationResult.data.widgets
        await pod.save()

        return NextResponse.json(createApiResponse({data: pod}))
    } catch {
        return NextResponse.json(createErrorResponse(["Failed to update pod"]), {status: 500})
    }
}
