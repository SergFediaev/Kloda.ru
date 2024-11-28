import { Select as NextUiSelect, type SelectProps } from '@nextui-org/select'

// ToDo: Fix label text-medium
export const Select = <T extends object>(props: SelectProps<T>) => (
  <NextUiSelect
    disallowEmptySelection
    variant='bordered'
    classNames={{
      base: 'w-auto min-w-36 flex-wrap gap-x-6',
      trigger: 'border-accent dark:border-accent-dark',
      selectorIcon: 'text-accent dark:text-accent-dark',
      label: 'text-medium',
      mainWrapper: 'w-auto flex-grow',
    }}
    listboxProps={{
      itemClasses: {
        base: 'data-[selected=true]:text-accent data-[selected=true]:dark:text-accent-dark',
      },
    }}
    popoverProps={{
      classNames: {
        content: 'text-black dark:text-white',
      },
    }}
    {...props}
  />
)
