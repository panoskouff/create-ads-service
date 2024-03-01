'use client'
import React, { CSSProperties } from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
  Controller,
  ControllerFieldState,
} from 'react-hook-form'
import { Label, Text, TextArea } from '#/atoms'
import AsyncSelect, { AsyncProps } from 'react-select/async'
import { fetchAreaSuggestions } from '#/queries'
import { debounce } from '#/utils'

type Option = { label: string; value: string }

const fetchOptions = async (inputValue: string): Promise<Option[]> => {
  if (inputValue.length < 3) {
    return []
  }

  const { hasError, data } = await fetchAreaSuggestions(inputValue)

  if (!data) {
    if (hasError) {
      // @todo display error
    }
    return []
  }

  return data
}

const loadOptionsDebounced = debounce(
  (inputValue: string, callback: (options: any) => void) => {
    fetchOptions(inputValue).then((options) => callback(options))
  },
  500,
)

type FormControlAreaAutocompleteProps<T extends FieldValues> = {
  fieldTitle: string
  // @todo pick from AsyncProps
} & Pick<UseControllerProps<T>, 'name' | 'rules'>
// &  AsyncProps<Option, true, { options: Option[] }>

export function FormControlAreaAutocomplete<T extends FieldValues>({
  fieldTitle,
  name,
  rules,
  ...rest
}: FormControlAreaAutocompleteProps<T>) {
  const { control } = useFormContext<T>()
  const { field, fieldState } = useController({ name, control, rules })

  const calculateStyles = (
    isFocused: boolean,
    fieldState: ControllerFieldState,
  ): CSSProperties => {
    // we use border instead of border color because we can't influence order of styles
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

  return (
    <div>
      {fieldTitle && (
        <Label
          htmlFor={name}
          required={Boolean(rules?.required)}
          fontSize='1rem'
          lineHeight='1.5rem'
        >
          {fieldTitle}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <AsyncSelect
            styles={{
              control: (baseStyles, state) => {
                const myStyles = calculateStyles(state.isFocused, fieldState)
                const borderColorStyle = myStyles.borderColor
                return {
                  ...baseStyles,
                  ...calculateStyles(state.isFocused, fieldState),
                  ':hover': { borderColor: borderColorStyle },
                }
              },
            }}
            isMulti
            loadOptions={loadOptionsDebounced}
            filterOption={(option, inputValue) => {
              return option.label
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            }}
            {...field}
          />
        )}
      />
      {fieldState.isTouched && fieldState.error?.message && (
        <Text
          fontSize='0.75rem'
          lineHeight='1.125rem'
          fontWeight='600'
          color='red'
        >
          {fieldState.error?.message}
        </Text>
      )}
    </div>
  )
}
