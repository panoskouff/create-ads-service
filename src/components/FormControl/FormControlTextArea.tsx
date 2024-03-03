'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { FormTextError, Label, Text, TextArea } from '#/atoms'
import { cn } from '#/utils/cn'
import { TextAreaProps } from '#/atoms/TextArea'
import { formInputStyles } from './styles'

type FormControlTextAreaProps<T extends FieldValues> = {
  fieldTitle: string
  placeholder?: string
} & Pick<UseControllerProps<T>, 'name' | 'rules'> &
  TextAreaProps

export function FormControlTextArea<T extends FieldValues>({
  fieldTitle,
  placeholder,
  name,
  rules,
  ...rest
}: FormControlTextAreaProps<T>) {
  const { control } = useFormContext<T>()
  const { field, fieldState } = useController({ name, control, rules })

  return (
    <div>
      {fieldTitle && (
        <Label htmlFor={name} required={Boolean(rules?.required)}>
          {fieldTitle}
        </Label>
      )}
      <TextArea
        {...field}
        placeholder={placeholder}
        required={Boolean(rules?.required)}
        id={name}
        className={cn(
          fieldState.isTouched && 'touched',
          fieldState.invalid ? 'invalid' : 'valid',
          formInputStyles,
        )}
        {...rest}
      />
      {fieldState.isTouched && fieldState.error?.message && (
        <FormTextError>{fieldState.error?.message}</FormTextError>
      )}
    </div>
  )
}
