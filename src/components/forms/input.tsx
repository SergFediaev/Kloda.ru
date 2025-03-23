import { Subfield } from '@/components/forms/subfield'
import { useGenerateId } from '@/hooks/useGenerateId'
import { cn } from '@/utils/mergeClasses'
import { Eye, EyeOff } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  useState,
} from 'react'

export type InputProps = {
  label?: ReactNode
  error?: ReactNode
  characterCount?: number
  isHorizontal?: boolean
  hasBorder?: boolean
  withIcon?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      characterCount,
      isHorizontal,
      hasBorder,
      withIcon,
      id,
      type,
      name,
      required,
      maxLength,
      className,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useGenerateId(id, name)
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
      setShowPassword(!showPassword)
    }

    const currentIcon = showPassword ? <Eye /> : <EyeOff />
    const currentType = !withIcon ? type : showPassword ? 'text' : 'password'

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
        <div className={'flex items-center'}>
          <input
            ref={ref}
            id={inputId}
            name={name}
            required={required}
            maxLength={maxLength}
            type={currentType ?? type}
            className={cn(
              'w-full flex-1 rounded-xl pr-12 outline-none',
              'truncate rounded-xl py-2 pl-4 shadow-inner',
              hasBorder && 'border-2 border-accent dark:border-accent-dark',
              type === 'number' && 'text-right',
            )}
            {...restProps}
          />
          {withIcon && (
            <button
              type='button'
              onClick={toggleShowPassword}
              className='-ml-12 px-3'
            >
              {currentIcon}
            </button>
          )}
        </div>
        <Subfield
          error={error}
          characterCount={characterCount}
          maxLength={maxLength}
        />
      </div>
    )
  },
)