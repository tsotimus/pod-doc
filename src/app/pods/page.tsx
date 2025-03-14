import PodsHeader from "@/features/pods/PodsHeader";
import PodsList from "@/features/pods/PodsList";
import dbConnect from "@/lib/dbConnect";
import Pod from "@/models/Pod";
import { PodDisplay } from "@/types/pod";
import { createApiResponse } from "@/utils/server/responses";
import { type HydratedDocument } from "mongoose";


const getAllPods = async() => {
  await dbConnect()
  const allPods = await Pod.find<HydratedDocument<PodDisplay>>()
  return createApiResponse({data: allPods.map((pod) => pod.toJSON())})
}


export default async function Home() {

  const pods = await getAllPods()
  return (
    <div className="flex flex-col gap-4">
      <PodsHeader />
      <PodsList initialPods={pods} />
    </div>
  );
}
