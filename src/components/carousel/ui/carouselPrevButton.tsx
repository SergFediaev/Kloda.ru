import type React from 'react'
import type { ComponentPropsWithRef } from 'react'

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = ({
  ...props
}: ComponentPropsWithRef<'button'>) => {
  const { children, ...restProps } = props

  return (
    <button
      className='z-[1] m-0 flex h-[3.6rem] w-[3.6rem] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 no-underline shadow-[inset_0_0_0_0.2rem_hsl(30,100%,40%)] [color:hsl(30,100%,60%)] disabled:[color:hsl(30,50%,50%)]'
      type='button'
      {...restProps}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg className='h-[35%] w-[35%]' viewBox='0 0 532 532'>
        <path
          fill='currentColor'
          d='M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z'
        />
      </svg>
      {children}
    </button>
  )
}

/*
.embla__button {
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
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 3.6rem;
  height: 3.6rem;
  z-index: 1;
  border-radius: 50%;
  color: var(--text-body);
  display: flex;
  align-items: center;
  justify-content: center;
}
.embla__button:disabled {
  color: var(--detail-high-contrast);
}*/