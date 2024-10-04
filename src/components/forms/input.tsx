import { useGenerateId } from '@/hooks/useGenerateId'
import { cn } from '@/utils/mergeClasses'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from 'react'

export type InputProps = {
  label?: ReactNode
  error?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, name, required, className, ...restProps }, ref) => {
    const inputId = useGenerateId(id, name)

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label
          htmlFor={inputId}
          className={cn(required && 'after:text-danger after:content-["*"]')}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          className='truncate rounded-xl px-4 py-2 shadow-inner'
          {...restProps}
        />
        <p className='text-danger'>{error}</p>
      </div>
    )
  },
)
