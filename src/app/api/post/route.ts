import { createPost, getPosts } from "@/backend/service/post.service"
import { NextRequest, NextResponse } from "next/server"

async function getHandler(request: NextRequest) {
    try {
        const offsetValue = Number(request.nextUrl.searchParams.get("offset")) || 0
        const post= await getPosts(offsetValue)
        return NextResponse.json(post)
    }
    catch(error){
        return NextResponse.json({message: "Error fetching posts"}, {status: 500})
    }
    

}

async function postHandler(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const post= await createPost(reqBody)
        if(!post){
            throw new Error("Post creation failed")
        }
        return NextResponse.json(post)
    }
    catch(error){
        console.log("Error creation:", error);
        return NextResponse.json({message: "Error in posting"}, {status: 500})
    }
}

export const GET = getHandler
export const POST = postHandler
