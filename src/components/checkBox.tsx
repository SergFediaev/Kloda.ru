import { Checkbox, type CheckboxProps } from '@nextui-org/checkbox'

export const CheckBox = (props: CheckboxProps) => (
  <Checkbox
    classNames={{
      base: 'max-w-full flex-row-reverse flex-wrap-reverse justify-between gap-x-4 p-0 m-0',
      wrapper:
        'before:border-accent before:dark:border-accent-dark after:bg-accent after:dark:bg-accent-dark mr-0',
      icon: 'dark:text-black text-white',
      label: 'text-primary dark:text-primary-dark',
    }}
    {...props}
  />
)
