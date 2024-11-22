import { Slider, type SliderProps } from '@nextui-org/slider'

export const RangeInput = (props: SliderProps) => (
  <Slider
    size='lg'
    classNames={{
      track: 'border-s-accent dark:border-s-accent-dark',
      filler: 'bg-accent dark:bg-accent-dark',
      thumb: 'bg-accent dark:bg-accent-dark',
    }}
    {...props}
  />
)
