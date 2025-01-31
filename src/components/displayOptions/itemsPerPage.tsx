import { Text } from '@/components/containers/text'

type Props = {
  itemsName: string
  currentItems: number
  totalItems: number
}

export const ItemsPerPage = ({
  itemsName = 'Items',
  totalItems,
  currentItems,
}: Props) => {
  return (
    <Text isCentered>
      <p>{itemsName}</p>
      <p>
        {currentItems} / {totalItems}
      </p>
    </Text>
  )
}