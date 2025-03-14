import HomeDisplay from "@/features/home/HomeDisplay";
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
    <div>
      <HomeDisplay/>
      <p>Num of Pods: {pods.data.length}</p>
    </div>
  );
}
