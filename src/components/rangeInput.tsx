import { useGenerateId } from '@/hooks/useGenerateId'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const RangeInput = ({ label, id, name, ...restProps }: Props) => {
  const inputId = useGenerateId(id, name)

  return (
    <label htmlFor={inputId} className='flex flex-col'>
      {label}
      <input type='range' id={inputId} name={name} {...restProps} />
    </label>
  )
}
