"use client"

import Typography from "@/components/ui/typography"
import { PodDisplay } from "@/types/pod"
import WidgetMenu from "@/features/widgets/WidgetMenu"
interface CanvasHeaderProps {
    pod: PodDisplay
}

const CanvasHeader = ({ pod }: CanvasHeaderProps) => {


    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div>
                <Typography variant="h1">{pod.name}</Typography>
            </div>
            <WidgetMenu />
        </div>
    )
}

export default CanvasHeader