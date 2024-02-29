'use client'
import React from 'react'
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

import { Label, Select, Text } from '#/atoms' // Assuming Select is your custom select component
import { cn } from '#/utils/cn'
import { styled } from '#/styled-system/jsx'

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
      <Select
        {...field}
        required={Boolean(rules?.required)}
        id={name}
        className={cn(
          fieldState.isTouched && 'touched',
          fieldState.invalid ? 'invalid' : 'valid',
        )}
        css={{
          _invalid: { color: '#6e757d' },
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
      >
        {options.map((option) => (
          <styled.option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            color={{ base: '#2b2e31', _disabled: '#6e757d' }}
            fontSize='1rem'
          >
            {option.label}
          </styled.option>
        ))}
      </Select>
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
