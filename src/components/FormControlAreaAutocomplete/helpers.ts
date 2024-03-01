import { fetchAreaSuggestions } from '#/queries'
import { debounce } from '#/utils'
import { CSSProperties } from 'react'
import { ControllerFieldState } from 'react-hook-form'

type Option = { label: string; value: string }

export const fetchOptions = async (inputValue: string): Promise<Option[]> => {
  if (inputValue.length < 3) {
    return []
  }

  const { data } = await fetchAreaSuggestions(inputValue)

  if (!data) {
    return []
  }

  return data
}

export const loadOptionsDebounced = debounce(
  (inputValue: string, callback: (options: any) => void) => {
    fetchOptions(inputValue).then((options) => callback(options))
  },
  500,
)

export const calculateStyles = (
  isFocused: boolean,
  fieldState: ControllerFieldState,
): CSSProperties => {
  let border = '1px solid #a7acb1'
  let borderColor = '#a7acb1'
  let boxShadow = ''

  if (isFocused && fieldState.isTouched === false) {
    borderColor = '#1862b5'
    boxShadow = '0 0 0 4px hsla(0, 0%, 100%, .7), 0 0 0 4px #005bed'
  }

  if (fieldState.isTouched && fieldState.invalid === false) {
    borderColor = '#6cb946'

    if (isFocused) {
      boxShadow = '0 0 0 4px hsla(0,0%,100%,.7), 0 0 0 4px #6cb946'
    }
  }

  if (fieldState.isTouched && fieldState.invalid) {
    borderColor = 'red'

    if (isFocused) {
      boxShadow = '0 0 0 4px hsla(0,0%,100%,.7),0 0 0 4px red'
    }
  }

  border = `1px solid ${borderColor}`

  return {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    outline: 'none',
    padding: '3px 2px',
    transition: 'border-color .2s ease-in-out, box-shadow .2s ease-in-out',
    border,
    borderColor,
    borderRadius: '3px',
    letterSpacing: 'inherit',
    willChange: 'box-shadow',
    boxShadow,
  }
}
