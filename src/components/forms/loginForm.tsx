'use client'

import { Button } from '@/components/button'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginSchema = z.infer<typeof loginSchema>

// ToDo: Form error
export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <Form onSubmit={onSubmit}>
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
        type='password'
        autoComplete='on'
        name='password'
        label='Password'
        placeholder='Password'
        required
        error={errors.password?.message}
      />
      <Button>Login</Button>
    </Form>
  )
}
