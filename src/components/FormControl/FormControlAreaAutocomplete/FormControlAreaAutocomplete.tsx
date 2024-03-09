'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
  Controller,
} from 'react-hook-form'
import { FormTextError, Label, Text } from '#/atoms'
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

  const shouldShowErrorMessage = fieldState.isTouched && fieldState.invalid

  return (
    <div>
      {fieldTitle && (
        /* we use labelledby to associate the label with the input, because
        react-select doesn't like id as prop so we can't use htmlFor */
        <Label id={`${name}-label`} required={Boolean(rules?.required)}>
          {fieldTitle}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <AsyncSelect
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
            filterOption={(option, inputValue) => {
              return option.label
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            }}
            instanceId={name}
            aria-labelledby={`${name}-label`}
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
