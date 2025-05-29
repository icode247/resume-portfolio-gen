import type React from "react"

interface EmptyPlaceholderProps {
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyPlaceholder({ title, description, action }: EmptyPlaceholderProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        {action}
      </div>
    </div>
  )
}
