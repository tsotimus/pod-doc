import mongoose, { type Model } from "mongoose";
import SuperJSON from "superjson";
import { type PodModel } from "@/types/pod";

const PodSchema = new mongoose.Schema<PodModel>(
  {
    name: {
      type: String,
      required: true,
    },
    //Not scalable, but it's ok for now
    blocks: [{
      _id: false,
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["TEXT"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      positionX: {
        type: Number,
        required: true,
      },
      positionY: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
      },
    }],
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
const Pod: Model<PodModel> = mongoose.models.Pod
? (mongoose.models.Pod as Model<PodModel>)
: mongoose.model<PodModel>("Pod", PodSchema);

export default Pod;