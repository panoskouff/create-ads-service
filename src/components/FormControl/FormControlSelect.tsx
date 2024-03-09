'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

import { FormTextError, Label, Select, Text } from '#/atoms'
import { cn } from '#/utils/cn'
import { styled } from '#/styled-system/jsx'
import { formSelectStyles } from './styles'

type SelectProps<T extends FieldValues> = {
  fieldTitle: string
  options: { value: string | number; label: string; disabled?: boolean }[]
} & Pick<UseControllerProps<T>, 'name' | 'rules'>

export function FormControlSelect<T extends FieldValues>({
  fieldTitle,
  name,
  rules,
  options,
}: SelectProps<T>) {
  const { control } = useFormContext<T>()
  const { field, fieldState } = useController({ name, control, rules })

  const shouldShowErrorMessage = fieldState.isTouched && fieldState.invalid

  return (
    <div>
      {fieldTitle && (
        <Label htmlFor={name} required={Boolean(rules?.required)}>
          {fieldTitle}
        </Label>
      )}
      <Select
        {...field}
        required={Boolean(rules?.required)}
        aria-required={Boolean(rules?.required)}
        className={cn(
          fieldState.isTouched && 'touched',
          fieldState.invalid ? 'invalid' : 'valid',
          formSelectStyles,
        )}
        id={name}
        aria-invalid={fieldState.invalid}
        aria-describedby={
          shouldShowErrorMessage ? `${name}-error-message` : undefined
        }
      >
        {options.map((option) => (
          <styled.option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            display={option.disabled ? 'none' : 'block'}
            color='#2b2e31'
            fontSize='1rem'
            fontFamily='mulish'
            aria-selected={field.value === option.value ? 'true' : 'false'}
          >
            {option.label}
          </styled.option>
        ))}
      </Select>
      {fieldState.isTouched && fieldState.error?.message && (
        <FormTextError id={`${name}-error-message`}>
          {fieldState.error?.message}
        </FormTextError>
      )}
    </div>
  )
}
