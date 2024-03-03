'use client'
import {
  UseControllerProps,
  useFormContext,
  useController,
  FieldValues,
} from 'react-hook-form'

import { FormTextError, Input, Label, Text } from '#/atoms'
import { cn } from '#/utils/cn'
import React from 'react'
import { InputProps } from '#/atoms/Input'
import { formInputTextStyles } from './styles'
import { css } from '#/styled-system/css'

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
        id={name}
        className={cn(
          fieldState.isTouched && 'touched',
          fieldState.invalid ? 'invalid' : 'valid',
          formInputTextStyles,
        )}
        {...rest}
      />
      {fieldState.isTouched && fieldState.error?.message && (
        <FormTextError>{fieldState.error?.message}</FormTextError>
      )}
    </div>
  )
}
