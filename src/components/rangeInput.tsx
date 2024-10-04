import { useGenerateId } from '@/hooks/useGenerateId'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const RangeInput = ({ label, id, name, ...restProps }: Props) => {
  const inputId = useGenerateId(id, name)

  return (
    <div className='flex flex-col'>
      <label htmlFor={inputId}>{label}</label>
      <input type='range' id={inputId} name={name} {...restProps} />
    </div>
  )
}
