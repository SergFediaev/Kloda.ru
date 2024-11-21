import { Select as NextUiSelect, type SelectProps } from '@nextui-org/select'

export const Select = <T extends object>(props: SelectProps<T>) => (
  <NextUiSelect
    variant='bordered'
    className='w-auto min-w-36'
    classNames={{
      trigger: 'border-accent dark:border-accent-dark',
      selectorIcon: 'text-accent dark:text-accent-dark',
    }}
    listboxProps={{
      itemClasses: {
        base: 'data-[selected=true]:text-accent data-[selected=true]:dark:text-accent-dark',
      },
    }}
    popoverProps={{
      classNames: {
        content: 'dark:text-white',
      },
    }}
    {...props}
  />
)
