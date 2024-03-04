'use client'
import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PropertyAdFormInputs } from '#/types'
import { AdPropertyForm } from './AdPropertyForm'
import { createAdMutation } from '#/network/mutations'
import { adaptInputDataForRequest } from './helpers'

export const AdPropertyFormContainer = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
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

  const onSubmit: SubmitHandler<PropertyAdFormInputs> = async (formData) => {
    setErrorMessage('')

    const dataToBeSubmitted = adaptInputDataForRequest(formData)

    try {
      const response = await createAdMutation(dataToBeSubmitted)

      if (response.ok) {
        const message = `Ad for "${formData.propertyTitle}" submitted successfully!`
        router.push(`/success-page?message=${message}`)
      } else {
        setErrorMessage(response.data.errorMessage)
      }
    } catch (error) {
      setErrorMessage('Something went wrong :/ Please try again later.')
    }
  }

  useEffect(() => {
    /* Trigger validation for all fields so they are initially 
      marked as invalid (even though not touched yet) */
    methods.trigger()
  }, [methods])

  return (
    <AdPropertyForm
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
      errorMessage={errorMessage}
    />
  )
}
