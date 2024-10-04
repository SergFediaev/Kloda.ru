import { useGenerateId } from '@/hooks/useGenerateId'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'select'>

export const Select = ({ label, id, name, ...restProps }: Props) => {
  const selectId = useGenerateId(id, name)

  return (
    <div className='flex flex-col'>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} name={name} {...restProps} />
    </div>
  )
}
