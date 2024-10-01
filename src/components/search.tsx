import { Button } from '@/components/button'
import { Wrapper } from '@/components/containers/wrapper'
import { useGenerateId } from '@/hooks/useGenerateId'
import { Search as SearchIcon, X } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import { type ChangeEvent, useRef } from 'react'

const SEARCH = 'search'

export const Search = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useTransitionRouter()
  const searchId = useGenerateId()
  const searchRef = useRef<HTMLInputElement>(null)

  const searchQuery = searchParams.get(SEARCH)?.toString()
  const searchBy = pathname === '/' ? 'cards' : 'users'
  const params = new URLSearchParams(searchParams)

  const deleteQueryParams = () => params.delete(SEARCH)

  const replacePathParams = () => replace(`${pathname}?${params}`)

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value

    if (term) {
      params.set(SEARCH, term)
    } else {
      deleteQueryParams()
    }

    replacePathParams()
  }

  const onReset = () => {
    if (searchRef.current) {
      searchRef.current.value = ''
    }

    deleteQueryParams()
    replacePathParams()
  }

  return (
    <Wrapper as='div' className='gap-2 truncate'>
      <label title='Search' htmlFor={searchId}>
        <SearchIcon />
      </label>
      <input
        ref={searchRef}
        type='search'
        className='min-w-0 truncate rounded-3xl border-2 border-accent px-3 py-1 dark:border-accent-dark'
        placeholder={`Search ${searchBy}`}
        onChange={onSearch}
        spellCheck
        defaultValue={searchQuery}
        id={searchId}
      />
      {searchQuery && (
        <Button variant='text' onClick={onReset} title='Reset search'>
          <X />
        </Button>
      )}
    </Wrapper>
  )
}
