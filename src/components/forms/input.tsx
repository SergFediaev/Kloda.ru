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
  isHorizontal?: boolean
  hasBorder?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      isHorizontal,
      hasBorder,
      id,
      name,
      required,
      className,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useGenerateId(id, name)

    return (
      <div
        className={cn(
          'flex gap-1',
          isHorizontal ? 'flex-wrap items-start justify-between' : 'flex-col',
          className,
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            required && 'after:text-danger after:content-["*"]',
            isHorizontal && 'w-1/2',
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          className={cn(
            'truncate rounded-xl px-4 py-2 shadow-inner',
            hasBorder && 'border-2 border-accent dark:border-accent-dark',
          )}
          {...restProps}
        />
        <p className='text-danger'>{error}</p>
      </div>
    )
  },
)
