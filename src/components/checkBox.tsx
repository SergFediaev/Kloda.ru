import { cn } from '@/utils/mergeClasses'
import { Checkbox, type CheckboxProps } from '@nextui-org/checkbox'

export const CheckBox = ({ className, ...restProps }: CheckboxProps) => (
  <Checkbox
    color='warning'
    className={cn('flex-row-reverse gap-6', className)}
    {...restProps}
  />
)
