import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider, FieldValues } from 'react-hook-form'
import { FormControlInputText } from './FormControlInputText'

var MockLabel: jest.Mock
jest.mock('#/atoms/Label', () => {
  MockLabel = jest.fn(() => <div>[Label]</div>)

  return {
    Label: MockLabel,
  }
})

var MockFormTextError: jest.Mock
jest.mock('#/atoms/FormTextError', () => {
  MockFormTextError = jest.fn(() => <div>[TextError]</div>)

  return {
    FormTextError: MockFormTextError,
  }
})

function FormWrapper<T extends FieldValues>({
  children,
  useFormProps,
}: {
  children: React.ReactNode
  useFormProps?: any
}) {
  const methods = useForm<T>(useFormProps)

  useEffect(() => {
    /* Trigger validation for all fields so they are initially 
      marked as invalid (even though not touched yet). 
    react-hook-form doesn't provide an option to have fields be 
      invalid on mount so we have to do this  */
    methods.trigger()
  }, [methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}

var mockCn: jest.Mock
jest.mock('#/utils/cn', () => {
  const actual = jest.requireActual('#/utils/cn')
  mockCn = jest.fn(actual.cn)

  return {
    cn: mockCn,
  }
})

const fieldTitle = 'mock-label-field-title'
const placeholder = 'mock-input-placeholder'
const fieldName = 'mock-field-name'

beforeEach(() => {
  mockCn.mockClear()
  MockLabel.mockClear()
  MockFormTextError.mockClear()
})

describe('FormControlInputText', () => {
  it('should render all fields correctly with the correct props', async () => {
    /* we need act here so that our assertions take into account the 2nd render, 
    caused by our wrapper's useEffect instead of the first one */
    await act(async () => {
      render(
        <FormWrapper
          useFormProps={{
            defaultValues: {
              [fieldName]: '',
            },
            mode: 'all',
          }}
        >
          <FormControlInputText
            fieldTitle={fieldTitle}
            placeholder={placeholder}
            name={fieldName}
            rules={{ required: true }}
          />
        </FormWrapper>,
      )
    })

    expect(screen.getByText('[Label]')).toBeInTheDocument()
    expect(MockLabel).toHaveBeenCalledWith(
      { htmlFor: fieldName, required: true, children: fieldTitle },
      {},
    )

    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.required).toBe(true)
    expect(input.id).toBe(fieldName)
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-required')).toBe('true')
    const classNames = mockCn.mock.calls[1]
    expect(classNames).not.toContain('touched')
    expect(classNames).not.toContain('valid')
    expect(classNames).toContain('invalid')
    // aria-describedby is not shown because our field is not touched yet
    expect(input.getAttribute('aria-describedby')).toBe(null)

    // since no user interaction has happened, there shouldn't be an error message
    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
  })

  it('should have the correct validation behavior', async () => {
    await act(async () => {
      render(
        <FormWrapper
          useFormProps={{
            defaultValues: {
              [fieldName]: '',
            },
            mode: 'all',
          }}
        >
          <FormControlInputText
            fieldTitle={fieldTitle}
            placeholder={placeholder}
            name={fieldName}
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
          />
        </FormWrapper>,
      )
    })

    // user hasn't started typing
    expect(MockLabel).toHaveBeenCalledWith(
      expect.objectContaining({ required: true }),
      {},
    )
    screen.debug()

    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement
    expect(input.required).toBe(true)
    expect(input.getAttribute('aria-required')).toBe('true')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    // get calls of mockCn for the 2nd render after useEffect has run
    const classNames = mockCn.mock.calls[1]
    expect(classNames).not.toContain('touched')
    expect(classNames).not.toContain('valid')
    expect(classNames).toContain('invalid')
    expect(input.getAttribute('aria-describedby')).toBe(null)

    // field is not touched even though is invalid
    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()

    // make the input valid
    fireEvent.focus(input)
    fireEvent.input(input, { target: { value: 'a' } })
    fireEvent.blur(input)

    await waitFor(() => {
      expect(input.value).toBe('a')
      expect(input.getAttribute('aria-invalid')).toBe('false')
      expect(input.getAttribute('aria-describedby')).toBe(null)
      const classNames2 = mockCn.mock.calls[mockCn.mock.calls.length - 1]
      expect(classNames2).toContain('touched')
      expect(classNames2).toContain('valid')
      expect(classNames2).not.toContain('invalid')

      // field is valid so error message shouldn't render
      expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
    })

    // clear the input so its empty and invalid
    fireEvent.focus(input)
    fireEvent.input(input, { target: { value: '' } })
    fireEvent.blur(input)

    await waitFor(() => {
      expect(input.value).toBe('')
      expect(input.getAttribute('aria-invalid')).toBe('true')
      expect(input.getAttribute('aria-describedby')).toBe(
        `${fieldName}-error-message`,
      )
      const classNames3 = mockCn.mock.calls[mockCn.mock.calls.length - 1]
      expect(classNames3).toContain('touched')
      expect(classNames3).not.toContain('valid')
      expect(classNames3).toContain('invalid')

      expect(screen.queryByText('[TextError]')).toBeInTheDocument()
      expect(MockFormTextError).toHaveBeenCalledWith(
        {
          id: `${fieldName}-error-message`,
          children: 'This field is required',
        },
        {},
      )
    })
  })

  it('should be valid if not required', async () => {
    await act(async () => {
      render(
        <FormWrapper
          useFormProps={{
            defaultValues: {
              [fieldName]: '',
            },
            mode: 'all',
          }}
        >
          <FormControlInputText
            fieldTitle={fieldTitle}
            placeholder={placeholder}
            name={fieldName}
            rules={{
              required: false,
            }}
          />
        </FormWrapper>,
      )
    })

    expect(MockLabel).toHaveBeenCalledWith(
      expect.objectContaining({ required: false }),
      {},
    )
    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement
    expect(input.required).toBe(false)
    expect(input.getAttribute('aria-required')).toBe('false')
    expect(input.getAttribute('aria-invalid')).toBe('false')
    expect(input.getAttribute('aria-describedby')).toBe(null)

    const classNames = mockCn.mock.calls[1]
    expect(classNames).not.toContain('touched')
    expect(classNames).toContain('valid')
    expect(classNames).not.toContain('invalid')

    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
  })
})
