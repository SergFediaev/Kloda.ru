import { Radio as NextUiRadio, type RadioProps } from '@nextui-org/radio'

export const Radio = (props: RadioProps) => (
  <NextUiRadio
    classNames={{
      wrapper:
        'border-accent dark:border-accent-dark group-data-[selected=true]:border-accent group-data-[selected=true]:dark:border-accent-dark',
      label:
        'text-black dark:text-white group-data-[selected=true]:text-accent group-data-[selected=true]:dark:text-accent-dark',
      control: 'bg-accent dark:bg-accent-dark',
    }}
    {...props}
  />
)
