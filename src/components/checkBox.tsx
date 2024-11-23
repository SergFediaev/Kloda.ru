import { cn } from '@/utils/mergeClasses'
import { Checkbox, type CheckboxProps } from '@nextui-org/checkbox'

export const CheckBox = ({ className, ...restProps }: CheckboxProps) => (
  <Checkbox
    className={cn('flex-row-reverse gap-6', className)}
    classNames={{
      wrapper:
        'before:border-accent before:dark:border-accent-dark after:bg-accent after:dark:bg-accent-dark',
      icon: 'dark:text-black text-white',
      label: 'text-primary dark:text-primary-dark',
    }}
    {...restProps}
  />
)
