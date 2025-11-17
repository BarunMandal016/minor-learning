"use client"
import { getPostList } from "@/actions/post"
import PopoverComponent from "@/components/common/PopoverComponent"
import { useQuery } from "@tanstack/react-query"
import { EllipsisVertical, Loader } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import PopoverOptions from "./PopoverOptions"

export default function UserPost() {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("offset before increase", offset)
            setOffset((prev) => prev + 10)
          }
        })
      },
      {
        threshold: 0,
      },
    )
    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  const { data, isPending, error } = useQuery({
    queryKey: ["post"],
    queryFn: async () => await getPostList(offset),
  })
  // if (isPending) return <div>Loading...</div>
  if (error) return <div>Error loading posts</div>
  return (
    <div className="p-4 flex flex-col items-center gap-5">
      {isPending ? (
        <div>Loading...</div>
      ) : (
        data.map((post) => (
          <div
            key={post.id}
            className="flex bg-zinc-800 text-white rounded-md p-2"
          >
            <div className="p-2 max-w-md min-w-96">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <PopoverComponent trigger={<EllipsisVertical className="cursor-pointer w-max" />} content={<PopoverOptions/>} />
          </div>
        ))
      )}
      <div
        ref={ref}
        className="h-10 flex items-center justify-center bg-red-700 w-full"
      >
        <Loader />
      </div>
    </div>
  )
}
