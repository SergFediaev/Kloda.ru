import type { ColumnsCount } from '@/components/containers/columns'
import { Radio } from '@/components/radio'
import { RadioGroup } from '@nextui-org/radio'
import { Columns2, Columns3, Rows4 } from 'lucide-react'

type Props = {
  columnsCount: ColumnsCount
  setColumnsCount: (columnsCount: ColumnsCount) => void
}

export const ColumnsRadio = ({ columnsCount, setColumnsCount }: Props) => {
  return (
    <RadioGroup
      label='Columns'
      orientation='horizontal'
      value={columnsCount}
      onValueChange={value => setColumnsCount(value as ColumnsCount)}
      className='text-center'
    >
      <Radio value='1' title='1'>
        <Rows4 />
      </Radio>
      <Radio value='2' title='2'>
        <Columns2 />
      </Radio>
      <Radio value='3' title='3'>
        <Columns3 />
      </Radio>
    </RadioGroup>
  )
}