"use client"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "@/components/form/TextInput";
import { Form, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { mutate } from "swr";

const FormSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
})

type FormData = z.infer<typeof FormSchema>

const PodsDialog = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<FormData>({
      resolver: zodResolver(FormSchema)
  })

  const onSubmit = (data: FormData) => {

    axios.post("/api/v1/pods", data)
    .then(async (res) => {
      await mutate("/api/v1/pods", res.data)
      toast.success("Pod created successfully")
      form.reset()
    })
    .catch((err) => {
      toast.error("Failed to create pod")
    })
    setOpen(false)
  }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Create Pod</Button>
              </DialogTrigger>
            <DialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader>
                      <DialogTitle>Create a new pod </DialogTitle>
                    </DialogHeader>
                      <TextInput name="name" label="Name" placeholder="Enter a name for your pod" rules={{required: "Name is required"}} />
                      <FormMessage />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button> 
                  </DialogClose>
                  <Button type="submit">Create Pod</Button>
                </DialogFooter>
                </form>
              </Form>
            </DialogContent>  
        </Dialog>
    )
}

export default PodsDialog;