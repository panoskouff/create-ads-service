'use client'

import { Button, Padding, Space, Text } from '#/atoms'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Padding p='20px'>
      <Text as='h1'>Something went wrong!</Text>
      <br />
      <Text as='p' color='crimson'>
        {error.message}
      </Text>
      <Space h='sp-xs' />
      <Button
        display='block'
        text='Try again'
        onClick={
          // attempt to recover by trying to re-render the segment
          () => reset()
        }
      />
    </Padding>
  )
}
