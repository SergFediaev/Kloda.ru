import type { Key } from '@/components/displayOptions/pagination'
import { Select } from '@/components/displayOptions/select'
import { SelectItem } from '@nextui-org/select'

// ToDo: string[]
const QUANTITIES = ['5', '10', '20', '50', '100'] as const
const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

const SORTS_USERS = {
  createdCardsCount: 'Created cards',
  dislikedCardsCount: 'Disliked cards',
  email: 'Email',
  favoriteCardsCount: 'Favorite cards',
  id: 'ID',
  lastLoginAt: 'Last login',
  likedCardsCount: 'Liked cards',
  registeredAt: 'Registered',
  username: 'Username',
} as const

type Props = {
  itemsName: string
  itemsCount: number
  sort: string
  order: string
  limit: string
  onChangeParams: (key: Key, value: string) => void
}

export const SelectorsGroup = ({
  itemsName,
  itemsCount,
  sort,
  order,
  limit,
  onChangeParams,
}: Props) => {
  const lowNumberItems = itemsCount < 2
  return (
    <div className='m-3 flex gap-2'>
      <Select
        label={`${itemsName} per page`}
        selectedKeys={[String(limit)]}
        onChange={({ target: { value } }) => onChangeParams('limit', value)}
        isDisabled={lowNumberItems}
      >
        {QUANTITIES.map(quantity => (
          <SelectItem
            key={quantity}
            value={quantity}
            textValue={String(quantity)}
          >
            {quantity}
          </SelectItem>
        ))}
      </Select>
      <Select
        label='Order by'
        selectedKeys={[order]}
        onChange={({ target: { value } }) => onChangeParams('order', value)}
        items={Object.entries(ORDERS)}
        isDisabled={lowNumberItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label='Sort by'
        selectedKeys={[sort]}
        onChange={({ target: { value } }) => onChangeParams('sort', value)}
        items={Object.entries(SORTS_USERS)}
        isDisabled={lowNumberItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
    </div>
  )
}