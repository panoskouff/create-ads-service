import React from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import {
  FormControlInputText,
  FormControlSelect,
  FormControlTextArea,
  FormControlAreaAutocomplete,
} from '../FormControl'
import { Button, Space, Text } from '#/atoms'
import { FormFieldSet } from '../FormFieldSet'
import { PropertyAdFormInputs } from '#/types'

export type AdPropertyFormProps = {
  methods: UseFormReturn<PropertyAdFormInputs>
  onSubmit: () => void
  errorMessage: string
}

export const AdPropertyForm: React.FC<AdPropertyFormProps> = ({
  methods,
  onSubmit,
  errorMessage,
}) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} data-testid='ad-property-form'>
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
              { label: 'Select an ad type', value: '', disabled: true },
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
            type='number'
            fieldTitle='Price in Euros'
            name='propertyPrice'
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
          <Text
            color='red'
            textAlign='center'
            css={{ w: '100%' }}
            data-testid='error-message'
          >
            {errorMessage}
          </Text>
        )}
      </form>
    </FormProvider>
  )
}
