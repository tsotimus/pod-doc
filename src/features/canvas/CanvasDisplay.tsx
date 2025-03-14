"use client"

import { ReactNode } from "react"
import { CanvasProvider } from "./CanvasContext"
import { Separator } from "@/components/ui/separator"
import { WidgetModel } from "@/types/widget"
import CanvasArea from "./CanvasArea"


interface CanvasDisplayProps {
    podId: string
    header: ReactNode
    defaultWidgets?: WidgetModel[]    
}

const CanvasDisplay = ({ header, podId, defaultWidgets = [] }:CanvasDisplayProps) => {
    return (
        <CanvasProvider podId={podId} defaultWidgets={defaultWidgets}>
            <div className="flex flex-col w-full gap-4">
                {header}
                <Separator />
                <CanvasArea />
            </div>
        </CanvasProvider>
    )
}

export default CanvasDisplay 