"use client"

import Typography from "@/components/ui/typography"
import { PodDisplay } from "@/types/pod"
import WidgetMenu from "@/features/widgets/WidgetMenu"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useCanvas } from "./CanvasContext"
interface CanvasHeaderProps {
    pod: PodDisplay
}

const CanvasHeader = ({ pod }: CanvasHeaderProps) => {

    const { handleSave } = useCanvas()

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div>
                <Typography variant="h1">{pod.name}</Typography>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleSave(true)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save <kbd className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded">⌘P</kbd>
                </Button>
                <WidgetMenu />
            </div>
        </div>
    )
}

export default CanvasHeader