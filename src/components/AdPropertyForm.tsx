'use client'
import React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { FormFieldSet } from './FormFieldSet'
import { FormControlInputText } from './FormControlInputText'
import { FormControlSelect } from './FormControlSelect'
import { FormControlTextArea } from './FormControlTextArea'
import { FormControlAreaAutocomplete } from './FormControlAreaAutocomplete/FormControlAreaAutocomplete'
import { Button, Space, Text } from '#/atoms'
import { PropertyAd, PropertyAdFormInputs } from '#/types'

export default function AdPropertyForm() {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const methods = useForm<PropertyAdFormInputs>({
    defaultValues: {
      propertyTitle: '',
      propertyPrice: '',
      propertyAdType: '',
      propertyAreas: [],
      propertyDescription: '',
    },
    mode: 'all',
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<PropertyAdFormInputs> = async (data) => {
    setErrorMessage('')

    const adaptedData: PropertyAd = {
      ...data,
      propertyAreas: data.propertyAreas.map((area) => ({
        id: area.value,
        name: area.label,
      })),
    }

    try {
      const response = await fetch('/api/create-ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: adaptedData,
        }),
      })

      if (response.ok) {
        return true
        const message = `Ad for ${data.propertyTitle} submitted successfully!`
        router.push(`/success-page?message=${message}`)
      } else {
        const responseData = await response.json()
        setErrorMessage(responseData.errorMessage)
      }
    } catch (error) {
      setErrorMessage('Something went wrong :/ Please try again later.')
    }
  }

  React.useEffect(() => {
    // trigger validation for all fields so they are initially invalid (even though not touched yet)
    methods.trigger()
  }, [methods])

  return (
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
            name='propertyAdType'
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
          <FormControlAreaAutocomplete
            fieldTitle='Area'
            name='propertyAreas'
            rules={{
              required: {
                value: true,
                message:
                  'Please select the matching area or areas of your property',
              },
            }}
          />
          <FormControlInputText
            fieldTitle='Price in Euros'
            name='propertyPrice'
            type='string'
            onChange={(e) => {
              const newValue = e.target.value
              if (newValue.match(/^[0-9]*$/) || newValue === '') {
                methods.setValue('propertyPrice', newValue)
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
        <Space h={20} />
        <Button type='submit' text='Submit Ad' />
        <Space h={20} />
        {errorMessage && (
          <Text color='red' textAlign='center' css={{ w: '100%' }}>
            {errorMessage}
          </Text>
        )}
      </form>
    </FormProvider>
  )
}
