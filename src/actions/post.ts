"use server"

import { CreatePostBodyType } from "@/backend/service/post.service"

async function getPostList(offset:number): Promise<CreatePostBodyType[]
 > {

  await new Promise(resolve => setTimeout(resolve, 2000))
  const result = await fetch(`http://localhost:3001/api/post/?offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return await result.json()
}
async function createPost(data: {
  title: string
  body: string
  userId: number
}) {
  const result = await fetch(`http://localhost/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await result.json()
}

export { getPostList, createPost }
