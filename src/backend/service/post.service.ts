import dbConnect from "../config/db"
import PostModel, { PostInterface } from "../models/post.model"
export type CreatePostBodyType = Pick<
  PostInterface,
  "title" | "id" | "body" | "userId"
>
async function getPosts(offset: number) {
  try {
    await dbConnect()
    // Logic to fetch posts from the database using the offset
    return await PostModel.find().skip(offset).limit(10)
  } catch (error) {
    throw new Error("Error fetching posts from database")
  }
}

/**
 *
 * @param data Body of the post details
 * @returns
 */

async function createPost(data: CreatePostBodyType) {
  try {
    await dbConnect()
    const newPost = new PostModel(data)
return await newPost.save()
  } catch (error) {
    console.log("Error in service:", error);
    return null
  }
}

export { getPosts, createPost }
