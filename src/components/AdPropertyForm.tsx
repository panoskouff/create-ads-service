'use client'
import React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Space } from '#/atoms'
import { FormFieldSet } from './FormFieldSet'
import { FormControlInputText } from './FormControlInputText'

type Inputs = {
  propertyTitle: string
  price: number
}

export default function AdPropertyForm() {
  const methods = useForm<Inputs>({
    defaultValues: {
      propertyTitle: '',
      price: 0,
    },
    mode: 'all',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    /* "handleSubmit" will validate inputs before invoking "onSubmit" */
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormFieldSet>
          <FormControlInputText
            fieldTitle='Title'
            name='propertyTitle'
            rules={{
              required: {
                value: true,
                message: 'Please add a title for your property',
              },
            }}
          />
          <Space h={16} />
          <FormControlInputText
            fieldTitle='price'
            name='price'
            rules={{ required: true }}
          />
        </FormFieldSet>
        <input type='submit' />
      </form>
    </FormProvider>
  )
}
