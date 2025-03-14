"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Plus, Text } from "lucide-react";
import { useCanvas } from "@/features/canvas/CanvasContext";
const WidgetMenu = () => {

    const { addWidget } = useCanvas()

    const handleAddTextBlock = () => {
        addWidget("TEXT", "")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Widget
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row items-center text-white" onClick={handleAddTextBlock}>
                        <Text className="w-4 h-4 mr-2"/>
                        Text Block
                        <DropdownMenuShortcut>⌥T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {/* Add more block types as needed here */}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default WidgetMenu;

