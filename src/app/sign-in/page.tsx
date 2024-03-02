'use client'
import { Button, Column, Input, Label, Space, Text } from '#/atoms'
import { FormInput } from '#/components/FormInput'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  const [formData, setFormData] = useState<{
    email: string
    password: string
  }>({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await signIn('credentials', {
        ...formData,
        redirect: false,
      })

      if (response?.ok) {
        /* We make a full page redirect because next has the
        unauthenticated homepage version cached  */
        window.location.href = '/'
      } else {
        setErrorMessage(response?.error || 'An error occurred')
      }
    } catch (error) {
      setErrorMessage('Failed to submit form. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <>
      <Text textStyle='title'>Sign in!</Text>
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
          <Button type='submit' disabled={isLoading} text='Sign in' />
          <div /> {/* spacer */}
          {isLoading && <Text>Submitting form...</Text>}
          {errorMessage && <Text color='red'>{errorMessage}</Text>}
        </Column>
      </form>
    </>
  )
}
