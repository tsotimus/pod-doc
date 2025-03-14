import { z } from "zod";
import { WidgetModel, WidgetSchema } from "@/types/widget";

export type PodModel = {
  name: string;
  widgets: WidgetModel[];
};


export type PodDisplay = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  widgets: WidgetModel[];
};

export const CreatePodSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
})

export const UpdatePodSchema = z.object({
  widgets: z.array(WidgetSchema),
})