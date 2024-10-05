import { useGenerateId } from '@/hooks/useGenerateId'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'select'>

export const Select = ({ label, id, name, ...restProps }: Props) => {
  const selectId = useGenerateId(id, name)

  return (
    <label htmlFor={selectId} className='flex flex-col'>
      {label}
      <select id={selectId} name={name} {...restProps} />
    </label>
  )
}
