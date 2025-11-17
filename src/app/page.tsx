import UserPost from "@/app/components/UserPost"
import { useId } from "react"

export default function Home() {
  const id = useId()
  console.log("Unique ID:", id)
  return <UserPost />
}
