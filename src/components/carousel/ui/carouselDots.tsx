import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithRef } from 'react'

type CarouselDotsProps = {
  scrollSnaps: number[]
  className?: string
  onDotButtonClick: () => void
  selectedIndex: number
} & ComponentPropsWithRef<'div'>

export const CarouselDots = ({
  onDotButtonClick,
  selectedIndex,
  scrollSnaps,
  className,
  ...restProps
}: CarouselDotsProps) => {
  return (
    <div
      className={cn(
        '-ml-0.5 flex flex-wrap items-center justify-end',
        className,
      )}
      {...restProps}
    >
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={'embla__dot'.concat(
            index === selectedIndex ? ' embla__dot--selected' : '',
          )}
        />
      ))}
    </div>
  )
}

type PropType = ComponentPropsWithRef<'button'>

export const DotButton: React.FC<PropType> = ({ ...props }: PropType) => {
  const { children, ...restProps } = props

  return (
    <button
      type='button'
      className="m-0 inline-flex h-[2.6rem] w-[2.6rem] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 no-underline shadow-[inset_0_0_0_0.2rem_hsl(30,100%,40%)] [-webkit-tap-highlight-color:hsla(30,100%,50%,0.5)] before:flex before:h-[1.4rem] before:w-[1.4rem] before:items-center before:justify-center before:rounded-full before:shadow-[inset_0_0_0_0.2rem_hsl(30,100%,40%)] selected:before:shadow-[inset_0_0_0_0.2rem_hsl(30,100%,60%)] before:content-['']"
      {...restProps}
    >
      {children}
    </button>
  )
}

/*
*.embla__dot {
  -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.embla__dot:after {
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  content: "";
}
.embla__dot--selected:after {
  box-shadow: inset 0 0 0 0.2rem var(--text-body);
}*/