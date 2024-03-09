'use client'
import {
  UseControllerProps,
  useFormContext,
  useController,
  FieldValues,
} from 'react-hook-form'

import { FormTextError, Input, Label } from '#/atoms'
import { cn } from '#/utils/cn'
import React from 'react'
import { InputProps } from '#/atoms/Input'
import { formInputTextStyles } from './styles'

type FormControlInputProps<T extends FieldValues> = {
  fieldTitle: string
  placeholder?: string
} & Pick<UseControllerProps<T>, 'name' | 'rules'> &
  InputProps

export function FormControlInputText<T extends FieldValues>({
  fieldTitle,
  placeholder,
  name,
  rules,
  ...rest
}: FormControlInputProps<T>) {
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
      <Input
        {...field}
        placeholder={placeholder}
        required={Boolean(rules?.required)}
        aria-required={Boolean(rules?.required)}
        className={cn(
          fieldState.isTouched && 'touched',
          fieldState.invalid ? 'invalid' : 'valid',
          formInputTextStyles,
        )}
        id={name}
        aria-invalid={fieldState.invalid}
        aria-describedby={
          shouldShowErrorMessage ? `${name}-error-message` : undefined
        }
        {...rest}
      />
      {fieldState.isTouched && fieldState.error?.message && (
        <FormTextError id={`${name}-error-message`}>
          {fieldState.error?.message}
        </FormTextError>
      )}
    </div>
  )
}
