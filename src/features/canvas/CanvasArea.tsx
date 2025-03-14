"use client"

import WidgetDisplay from "../widgets/WidgetDisplay"
import { useCanvas } from "./CanvasContext"


const CanvasArea = () => {
    const { widgets } = useCanvas()


    return (
        <div className="relative w-full h-full min-h-[600px] border border-gray-200 rounded-md bg-black">
            {widgets.map((widget) => (
                <WidgetDisplay widget={widget} key={widget.id}/>
            ))}
        </div>
    )
}

export default CanvasArea;