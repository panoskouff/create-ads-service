import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider, FieldValues } from 'react-hook-form'
import { FormControlTextArea } from './FormControlTextArea'

var MockLabel: jest.Mock
jest.mock('#/atoms/Label', () => {
  MockLabel = jest.fn(() => <div>[Label]</div>)
  return { Label: MockLabel }
})

var MockFormTextError: jest.Mock
jest.mock('#/atoms/FormTextError', () => {
  MockFormTextError = jest.fn(() => <div>[TextError]</div>)
  return { FormTextError: MockFormTextError }
})

var mockCn: jest.Mock
jest.mock('#/utils/cn', () => {
  const actual = jest.requireActual('#/utils/cn')
  mockCn = jest.fn(actual.cn)
  return { cn: mockCn }
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
    // trigger validation to mark fields as initially invalid
    methods.trigger()
  }, [methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}

const fieldTitle = 'mock-label-field-title'
const placeholder = 'mock-textarea-placeholder'
const fieldName = 'mock-field-name'

beforeEach(() => {
  mockCn.mockClear()
  MockLabel.mockClear()
  MockFormTextError.mockClear()
})

describe('FormControlTextArea', () => {
  it('should render correctly with the correct props', async () => {
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
          <FormControlTextArea
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

    const textarea = screen.getByPlaceholderText(
      placeholder,
    ) as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()
    expect(textarea.required).toBe(true)
    expect(textarea.id).toBe(fieldName)
    expect(textarea.getAttribute('aria-invalid')).toBe('true')
    expect(textarea.getAttribute('aria-required')).toBe('true')
    const classNames = mockCn.mock.calls[1]
    expect(classNames).not.toContain('touched')
    expect(classNames).toContain('invalid')
    expect(textarea.getAttribute('aria-describedby')).toBe(null)

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
          <FormControlTextArea
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

    const textarea = screen.getByPlaceholderText(
      placeholder,
    ) as HTMLTextAreaElement
    fireEvent.focus(textarea)
    fireEvent.input(textarea, { target: { value: 'a' } })
    fireEvent.blur(textarea)

    await waitFor(() => {
      expect(textarea.value).toBe('a')
      expect(textarea.getAttribute('aria-invalid')).toBe('false')
      const classNamesAfterInput =
        mockCn.mock.calls[mockCn.mock.calls.length - 1]
      expect(classNamesAfterInput).toContain('touched')
      expect(classNamesAfterInput).toContain('valid')

      expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
    })

    // clear the input to make it invalid
    fireEvent.focus(textarea)
    fireEvent.input(textarea, { target: { value: '' } })
    fireEvent.blur(textarea)

    await waitFor(() => {
      expect(textarea.getAttribute('aria-invalid')).toBe('true')
      expect(textarea.getAttribute('aria-describedby')).toBe(
        `${fieldName}-error-message`,
      )
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
          <FormControlTextArea
            fieldTitle={fieldTitle}
            placeholder={placeholder}
            name={fieldName}
            rules={{ required: false }}
          />
        </FormWrapper>,
      )
    })

    const textarea = screen.getByPlaceholderText(
      placeholder,
    ) as HTMLTextAreaElement
    expect(textarea.required).toBe(false)
    expect(textarea.getAttribute('aria-required')).toBe('false')
    expect(textarea.getAttribute('aria-invalid')).toBe('false')
    expect(textarea.getAttribute('aria-describedby')).toBe(null)

    const classNames = mockCn.mock.calls[1]
    expect(classNames).toContain('valid')
    expect(classNames).not.toContain('invalid')

    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
  })
})
