import HomeDisplay from "@/features/home/HomeDisplay";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { type UserModel } from "@/types/user";
import { type HydratedDocument } from "mongoose";

export const revalidate = 60

const getAllUsers = async() => {

  await dbConnect()
  const allUsers = await User.find<HydratedDocument<UserModel>>()

  return allUsers.map((user) => user.toJSON())
}


export default async function Home() {

  const users = await getAllUsers()

  return (
    <div>
      <HomeDisplay/>
      <p>Num of Users: {users.length}</p>
    </div>
  );
}
