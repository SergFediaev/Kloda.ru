import { CheckBox } from '@/components/checkBox'
import type { CheckboxProps } from '@nextui-org/checkbox'
import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
} & Omit<CheckboxProps, 'value' | 'onChange'> &
  Omit<UseControllerProps<T>, 'control' | 'defaultValue' | 'rules'>

export const FormCheckBox = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field: { value, ...restField },
  } = useController({ control, disabled, name, shouldUnregister })

  return <CheckBox isSelected={value} {...restField} {...restProps} />
}
