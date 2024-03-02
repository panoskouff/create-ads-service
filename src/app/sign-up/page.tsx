'use client'
import { Button, Column, Input, Label, Space, Text } from '#/atoms'
import { FormInput } from '#/components/FormInput'
import { SectionContainer } from '#/components/SectionContainer'
import { useState } from 'react'

export default function SignUpPage() {
  const [formData, setFormData] = useState<{
    email: string
    userName: string
    password: string
  }>({ email: '', userName: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accountCreated, setAccountCreated] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAccountCreated(false)
    setErrorMessage('')
    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (response.ok) {
        setAccountCreated(true)
      } else {
        setErrorMessage(data.error || 'An error occurred')
      }
    } catch (error) {
      setErrorMessage('Failed to submit form. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <SectionContainer maxW={400}>
      <Text textStyle='title'>Sign up!</Text>
      <Space h={20} />
      <form onSubmit={handleSubmit}>
        <Column gap={20}>
          <Column>
            <Label htmlFor='email'>email</Label>
            <FormInput
              id='email'
              name='email'
              disabled={isLoading}
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Label htmlFor='userName'>username</Label>
            <FormInput
              id='userName'
              name='userName'
              disabled={isLoading}
              required
              value={formData.userName}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Label htmlFor='password'>password</Label>
            <FormInput
              id='password'
              name='password'
              type='password'
              disabled={isLoading}
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Column>
          <div /> {/* spacer */}
          <Button type='submit' disabled={isLoading} text='Sign up' />
          <div /> {/* spacer */}
          {isLoading && <Text>Submitting form...</Text>}
          {accountCreated && <Text color='green'>Account created !</Text>}
          {errorMessage && <Text color='red'>{errorMessage}</Text>}
        </Column>
      </form>
    </SectionContainer>
  )
}
