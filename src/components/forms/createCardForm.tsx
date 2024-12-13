'use client'

import { Button } from '@/components/buttons/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { FormTextArea } from '@/components/forms/formTextArea'
import { useCreateCard } from '@/hooks/useCards'
import { handleCategories } from '@/utils/handleCategories'
import { getLocalItem, setLocalItem } from '@/utils/localStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const TITLE_MIN = 5
const TITLE_MAX = 100
const CONTENT_MIN = 10
const CONTENT_MAX = 2_000
const CATEGORIES_MAX = 100

const cardSchema = z.object({
  title: z.string().min(TITLE_MIN).max(TITLE_MAX),
  content: z.string().min(CONTENT_MIN).max(CONTENT_MAX),
  categories: z.string().max(CATEGORIES_MAX),
  username: z.string().optional(),
  email: z.string().email().optional(),
})

type CardSchema = z.infer<typeof cardSchema>

type CardContent = Omit<CardSchema, 'username' | 'email'>

const cardContent: CardContent = {
  title: '',
  content: '',
  categories: '',
}

const CARD_CONTENT = 'cardContent'

const removeCardContent = () => localStorage.removeItem(CARD_CONTENT)

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
    ...getLocalItem(CARD_CONTENT, cardContent),
    username,
    email,
  }

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CardSchema>({ defaultValues, resolver: zodResolver(cardSchema) })

  useEffect(() => {
    const subscription = watch(({ username, email, ...restValue }) =>
      setLocalItem<Partial<CardContent>>(CARD_CONTENT, restValue),
    )

    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = handleSubmit(
    ({ username, email, categories, ...restData }) =>
      mutate({
        ...restData,
        categories: handleCategories(categories),
        authorId,
      }),
  )

  const onReset = () => {
    reset({ ...cardContent, email, username })
    removeCardContent()
  }

  if (isSuccess) {
    removeCardContent()
    router.push(`/card/${data.id}`)
  }

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name='title'
        label='Title'
        placeholder='Card title'
        error={errors.title?.message}
        characterCount={watch('title').length}
        minLength={TITLE_MIN}
        maxLength={TITLE_MAX}
        required
        spellCheck
      />
      <FormTextArea
        control={control}
        name='content'
        label='Content'
        placeholder='Card content'
        error={errors.content?.message}
        characterCount={watch('content').length}
        minLength={CONTENT_MIN}
        maxLength={CONTENT_MAX}
        required
        spellCheck
      />
      <FormInput
        control={control}
        name='categories'
        label='Categories'
        placeholder='Comma-separated categories'
        error={errors.categories?.message}
        characterCount={watch('categories').length}
        maxLength={CATEGORIES_MAX}
      />
      <FormInput
        control={control}
        name='username'
        label='Author'
        placeholder='Username'
        error={errors.username?.message}
        required
        disabled
      />
      <FormInput
        control={control}
        name='email'
        label='Email'
        type='email'
        placeholder='example@mail.com'
        error={errors.email?.message}
        required
        disabled
      />
      <ButtonsContainer>
        <Button isStretched isLoading={isPending}>
          {createText}
        </Button>
        <Button type='reset' isStretched isDanger onClick={onReset}>
          Reset
        </Button>
      </ButtonsContainer>
    </Form>
  )
}
