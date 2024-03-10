'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
  Controller,
} from 'react-hook-form'
import { FormTextError, Label } from '#/atoms'
import AutoCompleteSelect from 'react-select/async'
import { calculateStyles, loadOptionsDebounced, filterOption } from './helpers'

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

  const shouldShowErrorMessage = fieldState.isTouched && fieldState.invalid

  // react-select adds the following id in this format
  const reactSelectInputId = `react-select-${name}-input`

  return (
    <div>
      {fieldTitle && (
        <Label htmlFor={reactSelectInputId} required={Boolean(rules?.required)}>
          {fieldTitle}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <AutoCompleteSelect
            {...field}
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
            required={Boolean(rules?.required)}
            aria-required={Boolean(rules?.required)}
            placeholder='Type to search for an area'
            isMulti
            loadOptions={loadOptionsDebounced}
            filterOption={filterOption}
            instanceId={name}
            aria-invalid={fieldState.invalid}
            aria-describedby={
              shouldShowErrorMessage ? `${name}-error-message` : undefined
            }
          />
        )}
      />
      {fieldState.isTouched && fieldState.error?.message && (
        <FormTextError id={`${name}-error-message`}>
          {fieldState.error.message}
        </FormTextError>
      )}
    </div>
  )
}
