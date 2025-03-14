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
    disableSave?: boolean
}

const CanvasDisplay = ({ header, podId, defaultWidgets = [], disableSave = false }:CanvasDisplayProps) => {
    return (
        <CanvasProvider podId={podId} defaultWidgets={defaultWidgets} disableSave={disableSave}>
            <div className="flex flex-col w-full gap-4">
                {header}
                <Separator />
                <CanvasArea />
            </div>
        </CanvasProvider>
    )
}

export default CanvasDisplay 