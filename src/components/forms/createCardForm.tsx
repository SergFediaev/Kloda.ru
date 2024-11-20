'use client'

import { Button } from '@/components/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { FormTextArea } from '@/components/forms/formTextArea'
import { useCreateCard } from '@/hooks/useCards'
import { handleCategories } from '@/utils/handleCategories'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const cardSchema = z.object({
  title: z.string(),
  content: z.string(),
  categories: z.string(),
  username: z.string().optional(),
  email: z.string().email().optional(),
})

type CardSchema = z.infer<typeof cardSchema>

type Props = {
  username: string
  email: string
  authorId: number
}

export const CreateCardForm = ({ username, email, authorId }: Props) => {
  const router = useTransitionRouter()
  const { data, mutate, isPending, error, isSuccess } = useCreateCard(authorId)

  const createText = isPending ? 'Creating' : 'Create'

  const defaultValues: CardSchema = {
    title: '',
    content: '',
    categories: '',
    username,
    email,
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSchema>({ defaultValues, resolver: zodResolver(cardSchema) })

  const onSubmit = handleSubmit(
    ({ username, email, categories, ...restData }) =>
      mutate({
        ...restData,
        categories: handleCategories(categories),
        authorId,
      }),
  )

  const onReset = () => reset(defaultValues)

  if (isSuccess) router.push(`/card/${data.id}`)

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name={'title'}
        label={'Title'}
        placeholder={'Card title'}
        error={errors.title?.message}
        required
        spellCheck
      />
      <FormTextArea
        control={control}
        name={'content'}
        label={'Content'}
        placeholder={'Card content'}
        error={errors.content?.message}
        required
        spellCheck
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
        name={'username'}
        label={'Author'}
        placeholder={'Username'}
        error={errors.username?.message}
        required
        disabled
      />
      <FormInput
        control={control}
        name={'email'}
        label={'Email'}
        type={'email'}
        placeholder={'example@mail.com'}
        error={errors.email?.message}
        required
        disabled
      />
      <ButtonsContainer>
        <Button isStretched isLoading={isPending}>
          {createText}
        </Button>
        <Button type={'reset'} isStretched isDanger onClick={onReset}>
          Reset
        </Button>
      </ButtonsContainer>
    </Form>
  )
}
