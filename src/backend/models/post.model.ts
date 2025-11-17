import mongoose, { model, ObjectId, Schema, Document } from "mongoose"
export interface PostInterface extends Document {
  id: number
  userId: number
  title: string
  body: string
//   addedBy: ObjectId
//   updatedBy: ObjectId
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
const PostSchema = new Schema<PostInterface>(
  {
    id: { type: Number, required: true },
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    // addedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // updatedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true },
)

PostSchema.index({ title: 1, deletedAt: 1 })

const PostModel =
  mongoose.models.Post || model<PostInterface>("Post", PostSchema)
export default PostModel
