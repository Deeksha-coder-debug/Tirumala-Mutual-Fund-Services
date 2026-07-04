import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white shadow hover:bg-primary-700",
        secondary:
          "border-transparent bg-primary-100 text-primary-900 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-700",
        destructive:
          "border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-600",
        outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
        success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20",
        glass: "glass-badge text-slate-900 dark:text-slate-50 border-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
