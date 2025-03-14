import { z } from "zod";

export type SupportedBlockTypes = "TEXT"

export type BlockModel = {
    id: string
    type: SupportedBlockTypes
    content: string
    positionX: number
    positionY: number
    width: number
    height: number
}

export const BlockSchema = z.object({
    id: z.string(),
    type: z.enum(["TEXT"]),
    content: z.string(),
    positionX: z.number(),  
    positionY: z.number(),
    width: z.number(),
    height: z.number(),
})