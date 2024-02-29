'use client'
import React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { FormFieldSet } from './FormFieldSet'
import { FormControlInputText } from './FormControlInputText'
import { FormControlSelect } from './FormControlSelect'

type Inputs = {
  propertyTitle: string
  price: string
  propertyType: string
}

export default function AdPropertyForm() {
  const methods = useForm<Inputs>({
    defaultValues: {
      propertyTitle: '',
      price: '',
      propertyType: '',
    },
    mode: 'all',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  React.useEffect(() => {
    // trigger validation for all fields so they are initially invalid (even though not touched yet)
    methods.trigger()
  }, [methods])

  return (
    /* "handleSubmit" will validate inputs before invoking "onSubmit" */
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormFieldSet title='Property details'>
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
          <FormControlSelect
            fieldTitle='Type'
            name='propertyType'
            options={[
              {
                label: '',
                value: '',
                disabled: true,
              },
              { label: 'Rent', value: 'rent' },
              { label: 'Buy', value: 'buy' },
              { label: 'Exchange', value: 'exchange' },
              { label: 'Donation', value: 'donation' },
            ]}
            rules={{
              required: {
                value: true,
                message: 'Please select an ad type for your property',
              },
            }}
          />
          <FormControlInputText
            fieldTitle='Price in Euros'
            name='price'
            type='string'
            onChange={(e) => {
              const newValue = e.target.value
              if (newValue.match(/^[0-9]*$/) || newValue === '') {
                methods.setValue('price', newValue)
              }
            }}
            rules={{
              required: {
                value: true,
                message: 'Please add a price for your property ad',
              },
            }}
          />
        </FormFieldSet>
        <input type='submit' />
      </form>
    </FormProvider>
  )
}
