import { z } from "zod";
import { BlockModel, BlockSchema } from "@/types/block";

export type PodModel = {
  name: string;
  blocks: BlockModel[];
};


export type PodDisplay = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  blocks: BlockModel[];
};

export const CreatePodSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
})

export const UpdatePodSchema = z.object({
  blocks: z.array(BlockSchema),
})