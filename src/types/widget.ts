import { z } from "zod";

export type SupportedWidgetTypes = "TEXT"

export type WidgetModel = {
    id: string
    type: SupportedWidgetTypes
    content: string
    positionX: number
    positionY: number
    width: number
    height: number
}

export const WidgetSchema = z.object({
    id: z.string(),
    type: z.enum(["TEXT"]),
    content: z.string(),
    positionX: z.number(),  
    positionY: z.number(),
    width: z.number(),
    height: z.number(),
})