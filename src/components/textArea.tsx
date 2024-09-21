import { useGenerateId } from '@/hooks/useGenerateId'
import { clsx } from 'clsx'
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
  ({ label, error, id, name, required, ...restProps }, ref) => {
    const textAreaId = useGenerateId(id, name)

    return (
      <div className='flex flex-col gap-1'>
        <label
          htmlFor={textAreaId}
          className={clsx(required && 'after:text-red-500 after:content-["*"]')}
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
        <p className='text-red-500'>{error}</p>
      </div>
    )
  },
)
