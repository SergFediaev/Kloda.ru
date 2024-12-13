'use client'

import type { CardModel } from '@/api/cards/cards.types'
import { Button } from '@/components/buttons/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { FormTextArea } from '@/components/forms/formTextArea'
import { useEditCard } from '@/hooks/useCards'
import { handleCategories } from '@/utils/handleCategories'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const cardSchema = z.object({
  title: z.string(),
  content: z.string(),
  categories: z.string(),
})

type CardSchema = z.infer<typeof cardSchema>

type Props = {
  card: CardModel
}

// ToDo: Duplicated logic and inputs (create card form)
export const EditCardForm = ({
  card: { id, title, content, categories },
}: Props) => {
  const router = useTransitionRouter()
  const { data, mutate, isPending, error, isSuccess } = useEditCard()

  const saveText = isPending ? 'Saving' : 'Save'

  const defaultValues: CardSchema = {
    title,
    content,
    categories: categories.join(', '),
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSchema>({ defaultValues, resolver: zodResolver(cardSchema) })

  const onSubmit = handleSubmit(({ categories, ...restData }) =>
    mutate({
      id: String(id),
      ...restData,
      categories: handleCategories(categories),
    }),
  )

  const onCancel = () => router.back()

  if (isSuccess) router.push(`/card/${data.id}`)

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name='title'
        label='Title'
        placeholder='Card title'
        error={errors.title?.message}
        required
        spellCheck
      />
      <FormTextArea
        control={control}
        name='content'
        label='Content'
        placeholder='Card content'
        error={errors.content?.message}
        required
        spellCheck
      />
      <FormInput
        control={control}
        name='categories'
        label='Categories'
        placeholder='Comma-separated categories'
        error={errors.categories?.message}
      />
      <ButtonsContainer>
        <Button isStretched isLoading={isPending}>
          {saveText}
        </Button>
        <Button type='button' isStretched isDanger onClick={onCancel}>
          Cancel
        </Button>
      </ButtonsContainer>
    </Form>
  )
}
