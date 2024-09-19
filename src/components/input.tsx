import { useGenerateId } from '@/hooks/useGenerateId'
import { clsx } from 'clsx'
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
  ({ label, error, id, name, required, ...restProps }, ref) => {
    const inputId = useGenerateId(id, name)

    return (
      <div className='flex flex-col gap-1'>
        <label
          htmlFor={inputId}
          className={clsx(required && 'after:content-["*"] after:text-red-500')}
        >
          {label}
        </label>
        <input
          {...restProps}
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          className='shadow-inner rounded-xl py-2 px-4 truncate'
        />
        <p className='text-red-500'>{error}</p>
      </div>
    )
  },
)
