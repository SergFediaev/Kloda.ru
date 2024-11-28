import { useWidth } from '@/hooks/useWidth'
import { cn } from '@/utils/mergeClasses'
import { Select as NextUiSelect, type SelectProps } from '@nextui-org/select'

type Props<T extends object> = {
  isHorizontal?: boolean
} & SelectProps<T>

export const Select = <T extends object>({
  isHorizontal,
  ...restProps
}: Props<T>) => (
  <NextUiSelect
    disallowEmptySelection
    size={useWidth().isDesktopWidth ? 'md' : 'sm'}
    variant='bordered'
    classNames={{
      base: 'w-auto min-w-36 flex-wrap gap-x-6',
      trigger: 'border-accent dark:border-accent-dark',
      selectorIcon: 'text-accent dark:text-accent-dark',
      label: cn(
        'text-primary dark:text-primary-dark',
        isHorizontal && 'text-medium',
      ),
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
    {...restProps}
  />
)
