'use client'

import { FormInput } from '@/components/FormInput'
import { FormTextArea } from '@/components/FormTextArea'
import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const cardSchema = z.object({
  title: z.string(),
  content: z.string(),
  categories: z.string(),
  author: z.string(),
  email: z.string().email(),
})

type CardSchema = z.infer<typeof cardSchema>

const defaultValues: CardSchema = {
  title: 'New card title',
  content:
    'Very informative and interesting content of the new card.\n\nCreated in app by user.',
  categories: 'JS, TS, Elysia, Next.js, Custom card',
  author: 'Tester',
  email: 'tester@gmail.com',
}

export const CardForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSchema>({ defaultValues, resolver: zodResolver(cardSchema) })

  const onSubmit = handleSubmit(data => console.log(data))

  const onReset = () => reset(defaultValues)

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-6'>
      <FormInput
        control={control}
        name={'title'}
        label={'Title'}
        placeholder={'Title'}
        error={errors.title?.message}
        required
      />
      <FormTextArea
        control={control}
        name={'content'}
        label={'Content'}
        placeholder={'Content'}
        error={errors.content?.message}
        required
      />
      <FormInput
        control={control}
        name={'categories'}
        label={'Categories'}
        placeholder={'Categories'}
        error={errors.categories?.message}
        required
      />
      <FormInput
        control={control}
        name={'author'}
        label={'Author'}
        placeholder={'Author'}
        error={errors.author?.message}
        required
      />
      <FormInput
        control={control}
        name={'email'}
        label={'Email'}
        placeholder={'example@mail.com'}
        error={errors.email?.message}
      />
      <div className='flex flex-wrap gap-10'>
        <Button type={'submit'} className='flex-grow'>
          Create
        </Button>
        <Button type={'reset'} onClick={onReset} className='flex-grow'>
          Reset
        </Button>
      </div>
    </form>
  )
}
