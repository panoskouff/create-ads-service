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
          <FormControlInputText fieldTitle='Title' name='propertyTitle' />
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
          />
          <FormControlAreaAutocomplete fieldTitle='Area' name='propertyAreas' />
          <FormControlInputText
            type='number'
            fieldTitle='Price in Euros'
            name='propertyPrice'
          />
          <FormControlTextArea
            fieldTitle='Extra description'
            name='propertyDescription'
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
            aria-live='polite'
            data-testid='error-message'
          >
            {errorMessage}
          </Text>
        )}
      </form>
    </FormProvider>
  )
}
