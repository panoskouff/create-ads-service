'use client'
import React from 'react'
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from 'react-hook-form'
import { FormFieldSet } from './FormFieldSet'
import { FormControlInputText } from './FormControlInputText'
import AsyncSelect, { AsyncProps } from 'react-select/async'
import { FormControlSelect } from './FormControlSelect'
import { FormControlTextArea } from './FormControlTextArea'

type Option = { label: string; value: string }

const mockOptions: Option[] = [
  { label: 'Rent', value: 'rent' },
  { label: 'Buy', value: 'buy' },
  { label: 'Exchange', value: 'exchange' },
  { label: 'Donation', value: 'donation' },
]

const loadData = (): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOptions)
    }, 1000)
  })
}

type Inputs = {
  propertyTitle: string
  price: string
  propertyType: string
  areaSelect: Option[]
}

export default function AdPropertyForm() {
  const methods = useForm<Inputs>({
    defaultValues: {
      propertyTitle: '',
      price: '',
      propertyType: '',
      areaSelect: [],
    },
    mode: 'all',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  React.useEffect(() => {
    // trigger validation for all fields so they are initially invalid (even though not touched yet)
    methods.trigger()
  }, [methods])

  console.log('hmm')
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
                label: 'Type',
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
          <Controller
            name='areaSelect'
            control={methods.control}
            render={({ field }) => (
              <AsyncSelect
                isMulti
                loadOptions={(x: string) => loadData()}
                filterOption={(option, inputValue) => {
                  return option.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                }}
                {...field}
              />
            )}
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
          <FormControlTextArea
            fieldTitle='Extra description'
            name='propertyDescription'
            rules={{
              required: false,
            }}
          />
        </FormFieldSet>
        <input type='submit' />
      </form>
    </FormProvider>
  )
}
