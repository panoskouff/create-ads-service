import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider, FieldValues } from 'react-hook-form'
import { FormControlSelect } from './FormControlSelect'

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

const fieldTitle = 'mock-select-field-title'
const fieldName = 'mock-field-name'
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
]

beforeEach(() => {
  mockCn.mockClear()
  MockLabel.mockClear()
  MockFormTextError.mockClear()
})

describe('FormControlSelect', () => {
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
          <FormControlSelect
            fieldTitle={fieldTitle}
            name={fieldName}
            rules={{ required: true }}
            options={options}
          />
        </FormWrapper>,
      )
    })

    expect(screen.getByText('[Label]')).toBeInTheDocument()
    expect(MockLabel).toHaveBeenCalledWith(
      { htmlFor: fieldName, required: true, children: fieldTitle },
      {},
    )

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select).toBeInTheDocument()
    expect(select.required).toBe(true)
    expect(select.id).toBe(fieldName)
    expect(select.getAttribute('aria-invalid')).toBe('true')
    expect(select.getAttribute('aria-required')).toBe('true')
    const optionElements = screen.getAllByRole('option')
    expect(optionElements.length).toBe(options.length)
    options.forEach((option, index) => {
      expect(optionElements[index]).toHaveTextContent(option.label)
      if (option.disabled) {
        expect(optionElements[index]).toBeDisabled()
      } else {
        expect(optionElements[index]).not.toBeDisabled()
      }
    })

    const classNames = mockCn.mock.calls[1]
    expect(classNames).toContain('invalid')
    expect(classNames).not.toContain('valid')
    expect(classNames).not.toContain('touched')
    expect(select.getAttribute('aria-describedby')).toBe(null)

    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
  })

  it('should show error message after field is touched if required', async () => {
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
          <FormControlSelect
            fieldTitle={fieldTitle}
            name={fieldName}
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            options={options}
          />
        </FormWrapper>,
      )
    })

    const classNames = mockCn.mock.calls[1]
    expect(classNames).not.toContain('touched')
    expect(classNames).toContain('invalid')
    expect(classNames).not.toContain('valid')

    const select = screen.getByRole('combobox') as HTMLSelectElement
    fireEvent.focus(select)
    fireEvent.blur(select)

    await waitFor(() => {
      const classNames2 = mockCn.mock.calls[mockCn.mock.calls.length - 1]
      expect(classNames2).toContain('touched')
      expect(classNames2).toContain('invalid')
      expect(classNames2).not.toContain('valid')
      expect(select.getAttribute('aria-invalid')).toBe('true')
      expect(select.getAttribute('aria-describedby')).toBe(
        `${fieldName}-error-message`,
      )
      expect(screen.getByText('[TextError]')).toBeInTheDocument()
      expect(MockFormTextError).toHaveBeenCalledWith(
        {
          id: `${fieldName}-error-message`,
          children: 'This field is required',
        },
        {},
      )
    })
  })

  it('should always be valid if not required', async () => {
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
          <FormControlSelect
            fieldTitle={fieldTitle}
            name={fieldName}
            options={options}
          />
        </FormWrapper>,
      )
    })

    const classNames = mockCn.mock.calls[1]
    expect(classNames).not.toContain('touched')
    expect(classNames).toContain('valid')
    expect(classNames).not.toContain('invalid')

    const select = screen.getByRole('combobox') as HTMLSelectElement
    fireEvent.focus(select)
    fireEvent.blur(select)

    await waitFor(() => {
      const classNames2 = mockCn.mock.calls[mockCn.mock.calls.length - 1]
      expect(classNames2).toContain('touched')
      expect(classNames2).toContain('valid')
      expect(classNames2).not.toContain('invalid')
      expect(select.getAttribute('aria-invalid')).toBe('false')
      expect(select.getAttribute('aria-describedby')).toBe(null)
      expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
    })
  })
})
