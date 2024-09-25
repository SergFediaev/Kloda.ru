import { TextArea, type TextAreaProps } from '@/components/forms/textArea'
import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
} & Omit<TextAreaProps, 'value' | 'onChange'> &
  Omit<UseControllerProps<T>, 'control' | 'defaultValue' | 'rules'>

export const FormTextArea = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, disabled, name, shouldUnregister })

  return <TextArea error={error?.message} {...field} {...restProps} />
}
