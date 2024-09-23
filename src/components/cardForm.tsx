'use client'

import type { CardArgs } from '@/api/cards/cards.types'
import { Button } from '@/components/button'
import { FormInput } from '@/components/formInput'
import { FormTextArea } from '@/components/formTextArea'
import { Wrapper } from '@/components/wrapper'
import { useCreateCard } from '@/hooks/useCards'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const cardSchema = z.object({
  title: z.string(),
  content: z.string(),
  categories: z.string(),
  author: z.string(),
  email: z.union([z.literal(''), z.string().email()]),
})

type CardSchema = z.infer<typeof cardSchema>

// ToDo: Mock data
/*const defaultValues: CardSchema = {
  title: 'New card title',
  content:
    'Very informative and interesting content of the new card.\n\nCreated in app by user.',
  categories: 'JS, TS, Elysia, Next.js, Custom card',
  author: 'Tester',
  email: 'tester@gmail.com',
}*/

const defaultValues: CardSchema = {
  title: '',
  content: '',
  categories: '',
  author: '',
  email: '',
}

export const CardForm = () => {
  const router = useTransitionRouter()
  const { data, mutate, isPending, error, isSuccess } = useCreateCard()

  const createText = isPending ? 'Creating' : 'Create'

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSchema>({ defaultValues, resolver: zodResolver(cardSchema) })

  const onSubmit = handleSubmit(({ categories, author, ...restData }) => {
    const card: CardArgs = {
      ...restData,
      categories: categories.split(','),
      likes: 0,
      dislikes: 0,
      authorId: author,
    }

    mutate(card)
  })

  const onReset = () => reset(defaultValues)

  if (isSuccess) {
    router.push(`card/${data.id}`)
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-6'>
      <FormInput
        control={control}
        name={'title'}
        label={'Title'}
        placeholder={'Card title'}
        error={errors.title?.message}
        required
      />
      <FormTextArea
        control={control}
        name={'content'}
        label={'Content'}
        placeholder={'Card content'}
        error={errors.content?.message}
        required
      />
      <FormInput
        control={control}
        name={'categories'}
        label={'Categories'}
        placeholder={'Comma-separated categories'}
        error={errors.categories?.message}
      />
      <FormInput
        control={control}
        name={'author'}
        label={'Author'}
        placeholder={'Username'}
        error={errors.author?.message}
        required
      />
      <FormInput
        control={control}
        name={'email'}
        label={'Email'}
        type={'email'}
        placeholder={'example@mail.com'}
        error={errors.email?.message}
      />
      <Wrapper as='div' className='gap-x-10 gap-y-6'>
        <Button type={'submit'} isStretched isLoading={isPending}>
          {createText}
        </Button>
        <Button type={'reset'} isStretched onClick={onReset}>
          Reset
        </Button>
      </Wrapper>
      <p className='text-danger'>{error?.message}</p>
    </form>
  )
}
