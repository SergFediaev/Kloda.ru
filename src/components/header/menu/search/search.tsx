import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { VoiceSearch } from '@/components/header/menu/search/voiceSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useGenerateId } from '@/hooks/useGenerateId'
import { usePaths } from '@/hooks/usePaths'
import { useWidth } from '@/hooks/useWidth'
import { Search as SearchIcon, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

const SEARCH_PARAM = 'search'

export const Search = () => {
  const { pathname, isUsersPath } = usePaths()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const searchId = useGenerateId()
  const initialSearch = searchParams.get(SEARCH_PARAM)
  const [search, setSearch] = useState(initialSearch ?? '')
  const debouncedSearch = useDebounce(search, 500)
  const searchRef = useRef<HTMLInputElement>(null)
  const { isDesktopWidth } = useWidth()

  const searchPlaceholder = `Search ${isUsersPath ? 'users' : 'cards'}${isDesktopWidth ? ' (Ctrl + K)' : ''}`

  const onSearch = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => setSearch(value)

  const onReset = useCallback(() => setSearch(''), [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedSearch) {
      params.set(SEARCH_PARAM, debouncedSearch)

      if (searchParams.get(SEARCH_PARAM) !== debouncedSearch)
        params.set('page', String(1))
    } else {
      params.delete(SEARCH_PARAM)
    }

    replace(`${pathname}?${params}`)
  }, [debouncedSearch, replace, pathname, searchParams])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    replace(`${pathname}?${params}`)
  }, [searchParams, replace, pathname])

  useEffect(() => {
    if (!searchParams.get(SEARCH_PARAM)) onReset()
  }, [searchParams, onReset])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key.toLowerCase() === 'k') {
          event.preventDefault()
          searchRef.current?.focus()
        }
      }
    }

    addEventListener('keydown', onKeyDown)
    return () => removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <Wrapper as='div' className='flex-nowrap gap-2 truncate'>
      <label title='Search' htmlFor={searchId}>
        <SearchIcon />
      </label>
      <div className='relative flex min-w-0'>
        <input
          value={search}
          type='search'
          className='min-w-0 truncate rounded-3xl border-2 border-accent py-1 pr-8 pl-3 dark:border-accent-dark'
          placeholder={searchPlaceholder}
          onChange={onSearch}
          spellCheck
          id={searchId}
          ref={searchRef}
        />
        {search && (
          <Button
            variant='text'
            onClick={onReset}
            title='Reset search'
            className='-translate-y-1/2 absolute top-1/2 right-2'
          >
            <X />
          </Button>
        )}
      </div>
      <VoiceSearch setSearch={setSearch} />
    </Wrapper>
  )
}