import { CardControl } from '@/components/header/menu/cardControl'
import { usePaths } from '@/hooks/usePaths'

export const CardControlWrapper = () =>
  usePaths().isNotCardPath ? null : <CardControl />
