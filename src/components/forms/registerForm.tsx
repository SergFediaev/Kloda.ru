'use client'

import { Button } from '@/components/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { useRegister } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// ToDo: Passwords regex, min, max
const registerSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    }
  })

type RegisterSchema = z.infer<typeof registerSchema>

const defaultValues: RegisterSchema = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const RegisterForm = () => {
  const router = useTransitionRouter()
  const { data, mutate, isPending, error, isSuccess } = useRegister()

  const registerText = isPending ? 'Registering' : 'Register'

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(data => mutate(data))

  const onReset = () => reset(defaultValues)

  if (isSuccess) {
    router.push(`/user/${data.userId}`)
  }

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name='username'
        label='Username'
        placeholder='Username'
        required
        error={errors.username?.message}
      />
      <FormInput
        control={control}
        name='email'
        label='Email'
        type='email'
        placeholder='example@mail.com'
        required
        error={errors.email?.message}
      />
      <FormInput
        control={control}
        name='password'
        label='Password'
        type='password'
        autoComplete='on'
        placeholder='Password'
        required
        error={errors.password?.message}
      />
      <FormInput
        control={control}
        type='password'
        autoComplete='on'
        name='confirmPassword'
        label='Confirm password'
        placeholder='Confirm password'
        required
        error={errors.confirmPassword?.message}
      />
      <ButtonsContainer>
        <Button isStretched isLoading={isPending}>
          {registerText}
        </Button>
        <Button type={'reset'} isStretched onClick={onReset}>
          Reset
        </Button>
      </ButtonsContainer>
    </Form>
  )
}
