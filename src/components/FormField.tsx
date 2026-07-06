import type { ReactNode } from 'react'

export const fieldInputClass =
  'w-full rounded border border-[#d7dcd6] px-3.5 py-2.5 text-sm text-[#3a423b] outline-none focus:border-[#123f30]'

export function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13.5px] font-semibold text-[#20291f]">
        {label}
        {required && <span className="text-[#c9a34a]"> *</span>}
      </span>
      {children}
      {hint && <span className="text-[12.5px] text-[#8a938b]">{hint}</span>}
    </label>
  )
}
