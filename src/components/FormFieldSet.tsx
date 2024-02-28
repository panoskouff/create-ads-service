import { Text } from '#/atoms'
import React from 'react'
import { styled } from '#/styled-system/jsx'

type FormFieldSetProps = {
  children: React.ReactNode
}

export const FormFieldSet: React.FC<FormFieldSetProps> = ({ children }) => {
  return (
    <styled.fieldset
      p='48px 16px 8px 16px'
      border='1px solid #d7d9dd'
      pos='relative'
    >
      <styled.legend pos='absolute' top='1rem'>
        <Text as='h3' fontSize={18} lineHeight='28px' fontWeight='600'>
          Property details
        </Text>
      </styled.legend>
      {children}
    </styled.fieldset>
  )
}
