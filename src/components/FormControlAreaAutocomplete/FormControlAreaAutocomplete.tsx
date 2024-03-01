'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
  Controller,
} from 'react-hook-form'
import { Label, Text } from '#/atoms'
import AsyncSelect from 'react-select/async'
import { calculateStyles, loadOptionsDebounced } from './helpers'

type FormControlAreaAutocompleteProps<T extends FieldValues> = {
  fieldTitle: string
} & Pick<UseControllerProps<T>, 'name' | 'rules'>

export function FormControlAreaAutocomplete<T extends FieldValues>({
  fieldTitle,
  name,
  rules,
}: FormControlAreaAutocompleteProps<T>) {
  const { control } = useFormContext<T>()
  const { fieldState } = useController({ name, control, rules })

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
