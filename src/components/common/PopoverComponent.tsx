"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface GenericPopoverProps {
  trigger: React.ReactNode
  content: React.ReactNode
}

export default function PopoverComponent({ trigger, content }: GenericPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>

      <PopoverContent>
        {content}
      </PopoverContent>
    </Popover>
  )
}
