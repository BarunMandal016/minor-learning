"use client"
import { getPostList } from "@/actions/post"
import PopoverComponent from "@/components/common/PopoverComponent"
import { useInfiniteQuery } from "@tanstack/react-query"
import { EllipsisVertical, Loader } from "lucide-react"
import { useEffect, useRef } from "react"
import PopoverOptions from "./PopoverOptions"
import clsx from "clsx"

export default function UserPost() {
  const ref = useRef<HTMLDivElement | null>(null)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post"],
    queryFn: async ({ pageParam }) => getPostList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < 10 ? undefined : lastPageParam + 10,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && hasNextPage) {
            // await new Promise((res) => setTimeout(res, 5000))
            console.log(entry.target)
            await fetchNextPage()
          }
        })
      },
      {
        threshold: 1,
      },
    )
    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  })

  return status === "pending" ? (
    <p>Loading</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="p-4 flex flex-col items-center gap-5">
      {data.pages.map((group) =>
        group.map((post) => (
          <div
            key={post.id}
            className="flex bg-zinc-800 text-white rounded-md p-2"
          >
            <div className="p-2 max-w-md min-w-96">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <PopoverComponent
              trigger={<EllipsisVertical className="cursor-pointer w-max" />}
              content={<PopoverOptions />}
            />
          </div>
        )),
      )}
      <div
        ref={ref}
        className={clsx(
          "h-10 flex items-center justify-center bg-red-700 w-full",
          hasNextPage ? "flex" : "hidden",
        )}
      >
        <Loader />
      </div>
    </div>
  )
}
