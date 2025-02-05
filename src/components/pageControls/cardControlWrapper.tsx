import { CardControl } from '@/components/pageControls'
import { usePaths } from '@/hooks/usePaths'

export const CardControlWrapper = () =>
  usePaths().isNotCardPath ? null : <CardControl />
