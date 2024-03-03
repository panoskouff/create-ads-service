import { Text } from '#/atoms'
import React from 'react'
import { styled, HTMLStyledProps } from '#/styled-system/jsx'

type FormFieldSetProps = {
  title: string
  children: React.ReactNode
} & HTMLStyledProps<'fieldset'>

export const FormFieldSet: React.FC<FormFieldSetProps> = ({
  title,
  children,
  ...rest
}) => (
  <styled.fieldset
    pos='relative'
    display='flex'
    flexDirection='column'
    gap='16px'
    p='48px 16px 12px 16px'
    border='1px solid #d7d9dd'
    borderRadius='5px'
    {...rest}
  >
    <styled.legend pos='absolute' top='1rem'>
      <Text as='h3' fontSize={18} lineHeight='28px' fontWeight='600'>
        {title}
      </Text>
    </styled.legend>
    {children}
  </styled.fieldset>
)
