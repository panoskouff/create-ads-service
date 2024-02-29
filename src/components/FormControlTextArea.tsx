'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { Label, Text, TextArea } from '#/atoms'
import { cn } from '#/utils/cn'
import { TextAreaProps } from '#/atoms/TextArea'

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
        <Label
          htmlFor={name}
          required={Boolean(rules?.required)}
          fontSize='1rem'
          lineHeight='1.5rem'
        >
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
        )}
        css={{
          _focusNotTouched: {
            borderColor: '#1862b5',
            boxShadow: '0 0 0 4px hsla(0, 0%, 100%, .7), 0 0 0 4px #005bed',
            outline: 'none',
          },
          _touchedValid: {
            borderColor: '#6cb946;',
          },
          _focusTouchedValid: {
            boxShadow: '0 0 0 4px hsla(0,0%,100%,.7), 0 0 0 4px #6cb946',
            outline: 'none',
          },
          _touchedInvalid: {
            borderColor: 'red',
          },
          _focusTouchedInvalid: {
            boxShadow: '0 0 0 4px hsla(0,0%,100%,.7),0 0 0 4px red',
            outline: 'none',
          },
        }}
        {...rest}
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
