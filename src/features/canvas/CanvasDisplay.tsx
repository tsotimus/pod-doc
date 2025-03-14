"use client"

import { ReactNode } from "react"
import { CanvasProvider } from "./CanvasContext"
import { Separator } from "@/components/ui/separator"
import { WidgetModel } from "@/types/widget"


interface CanvasDisplayProps {
    podId: string
    header: ReactNode
    defaultBlocks?: WidgetModel[]    
}

const CanvasDisplay = ({ header, podId, defaultBlocks }:CanvasDisplayProps) => {
    return (
        <CanvasProvider podId={podId} defaultBlocks={defaultBlocks}>
            <div className="flex flex-col w-full gap-4">
                {header}
                <Separator />
                {/* <Show Canvas Here /> */}
            </div>
        </CanvasProvider>
    )
}

export default CanvasDisplay 