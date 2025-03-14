import { z } from "zod";
import { WidgetModel, BlockSchema } from "@/types/widget";

export type PodModel = {
  name: string;
  blocks: WidgetModel[];
};


export type PodDisplay = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  blocks: WidgetModel[];
};

export const CreatePodSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
})

export const UpdatePodSchema = z.object({
  blocks: z.array(BlockSchema),
})