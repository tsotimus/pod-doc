import { type UserModel } from "@/types/user";
import mongoose, { type Model } from "mongoose";
import SuperJSON from "superjson";

const UserSchema = new mongoose.Schema<UserModel>(
  {

  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;     
        const { json } = SuperJSON.serialize(ret);
        return json; // Return the serialized object
      },
    },
  }
);


  // Create or get the Project model with proper type
const User: Model<UserModel> = mongoose.models.User
? (mongoose.models.User as Model<UserModel>)
: mongoose.model<UserModel>("User", UserSchema);

export default User;