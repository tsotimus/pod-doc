import CanvasDisplay from "@/features/canvas/CanvasDisplay"
import Typography from "@/components/ui/typography"
import dbConnect from "@/lib/dbConnect"
import Pod from "@/models/Pod"
import { PodDisplay } from "@/types/pod"
import { HydratedDocument } from "mongoose"
import { notFound } from "next/navigation"
import CanvasHeader from "@/features/canvas/CanvasHeader"

export const dynamic = 'force-dynamic'

const getPod = async (id: string) => {
    try {
        await dbConnect()
        const pod = await Pod.findOne<HydratedDocument<PodDisplay>>({_id: id})
        if (!pod) {
            return null
        }
        return pod.toJSON()
    } catch (error) {
        console.error(error)
        return null
    }
}


const PodPage = async ({params}: {params: {id: string}}) => {
    // eslint-disable-next-line @typescript-eslint/await-thenable -- This is a nextjs quirk
    const {id} = await params
    const pod = await getPod(id)

    if (!pod) {
        return notFound()
    }

    return (
        <div className="flex flex-col gap-4">
            <CanvasDisplay header={<CanvasHeader pod={pod} />} podId={id} />
        </div>
    )
}


export default PodPage;