import { isObjectIdOrHexString, type Types } from "mongoose";
import SuperJSON from "superjson";

// Convert a subdocument to JSON, need this for serialising subdocuments for Next.js
export const dbSubDocumentToJSON = (item: Types.ObjectId | object) => {
    if (isObjectIdOrHexString(item)) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-base-to-string
        return item.toString() as string;
    } else {
        const { json } = SuperJSON.serialize(item);
        return json;
    }   
}