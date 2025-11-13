import { useId } from "react"

export default function Home() {
  const id = useId()
  console.log("Unique ID:", id)
  return <div>Learn by creating the branches from this templates</div>
}
