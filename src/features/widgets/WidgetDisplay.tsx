"use client"

import { Rnd } from "react-rnd";
import { useCanvas } from "@/features/canvas/CanvasContext";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { WidgetModel } from "@/types/widget";
import { Textarea } from "@/components/ui/textarea";

interface WidgetDisplayProps {
    widget: WidgetModel
}

const WidgetDisplay = ({ widget }: WidgetDisplayProps) => {

    const { updateWidgetPosition, updateWidgetSize, updateWidgetContent, handleSave, removeWidget } = useCanvas()

    const handleDelete = () => {
        removeWidget(widget.id)
    }

    return (
        <Rnd
            key={widget.id}
            className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
            default={{
                x: widget.positionX,
                y: widget.positionY,
                width: widget.width,
                height: widget.height,
            }}
            onDragStop={(e, d) => {
                updateWidgetPosition(widget.id, d.x, d.y)
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateWidgetSize(
                    widget.id,
                    ref.offsetWidth,
                    ref.offsetHeight
                )
                updateWidgetPosition(widget.id, position.x, position.y)
            }}
        >
            <ContextMenu>
                <ContextMenuTrigger>
                <Textarea
                    className="w-full z-10 h-full p-4 text-black resize-none outline-none border-none bg-transparent"
                    value={widget.content}
                    onChange={(e) => updateWidgetContent(widget.id, e.target.value)}
                    placeholder="Enter text here..."
                    onClick={(e) => e.stopPropagation()}
                    onBlur={handleSave}
                />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-fit z-50 bg-black" >
                    <ContextMenuItem className="cursor-pointer" onSelect={handleDelete}>Delete</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </Rnd>
    )
}

export default WidgetDisplay;