'use client'
import {
  UseControllerProps,
  useFormContext,
  useController,
  FieldValues,
} from 'react-hook-form'

import { Input as InputAtom, Label, Text } from '#/atoms'
import { cn } from '#/utils/cn'
import React from 'react'

type InputProps<T extends FieldValues> = { fieldTitle: string } & Pick<
  UseControllerProps<T>,
  'name' | 'rules'
>

export function FormControlInputText<T extends FieldValues>({
  fieldTitle,
  name,
  rules,
}: InputProps<T>) {
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
      <InputAtom
        {...field}
        placeholder={name}
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
            background:
              '#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAABdklEQVR4AeXZwW3DMAwFUI8goKLRY0YQZPueTZIN2g2SDdoN3FuB2LJG8AgZwSN4hLQ8FOCtEOgIokmA9zwgMMXPam/lQ33xsb5UGqqJ8NYEeGDvHt1McPrDUrQa7G7RbrBHCtw12t3ANcGuiPq3JzhpwcpHu29zSMZij/AlFAtLOtbOirBwd9EYBVhlWB9gUYZ9PQggasX2xqjCtiPcFWD1YOnmM6vB+lD36Vi7Eixvx+xu4MrHgttyoV5zoH2EjxKwjxxoDN1SsdjtYI/PTA8WfASUgu3CyznDQk3QCrAM9KZ/4/f86QELzcAGe91m0I900HPQArBYOLT9L4CNTrgK5Mey0SRN6I1JHHUMrAD0dlgBaJzrxWLZ6AlmdlCOPcJnlbu6mPZjSfcEKyooZ6DrKA7LRYu+CrTpHx75QbkPcFaDZaP5VwH5aFGhWzvYqxosRavBUrQaLEWrwVK0GixF868CwgrfwoygXDZaBZaiyVWguPoBTOcsChkFfL4AAAAASUVORK5CYII=) calc(100% - 15px) 50% / 15px 12px no-repeat;',
            paddingRight: '2.5rem',
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
