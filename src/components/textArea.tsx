import { useGenerateId } from '@/hooks/useGenerateId'
import { cn } from '@/utils/mergeClasses'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from 'react'

export type TextAreaProps = {
  label?: ReactNode
  error?: ReactNode
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, name, required, className, ...restProps }, ref) => {
    const textAreaId = useGenerateId(id, name)

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label
          htmlFor={textAreaId}
          className={cn(required && 'after:text-danger after:content-["*"]')}
        >
          {label}
        </label>
        <textarea
          {...restProps}
          ref={ref}
          id={textAreaId}
          name={name}
          required={required}
          className='min-h-24 whitespace-pre-wrap rounded-xl px-4 py-2 shadow-inner'
        />
        <p className='text-danger'>{error}</p>
      </div>
    )
  },
)
