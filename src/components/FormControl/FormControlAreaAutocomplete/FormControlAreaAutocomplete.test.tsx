import React, { useEffect } from 'react'
import { render, screen, act } from '@testing-library/react'
import { useForm, FormProvider, FieldValues } from 'react-hook-form'
import { FormControlAreaAutocomplete } from './FormControlAreaAutocomplete'

var mockLoadOptionsDebounced: jest.Mock
var mockFilterOption: jest.Mock
jest.mock('./helpers', () => {
  mockLoadOptionsDebounced = jest.fn()
  mockFilterOption = jest.fn()
  return {
    loadOptionsDebounced: mockLoadOptionsDebounced,
    filterOption: mockFilterOption,
    calculateStyles: jest.fn(),
  }
})

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

var MockAutoCompleteSelect: jest.Mock
jest.mock('react-select/async', () => {
  MockAutoCompleteSelect = jest.fn(() => <div>[AutoCompleteSelect]</div>)
  return MockAutoCompleteSelect
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
    // trigger validation to mark fields initially invalid if they are
    methods.trigger()
  }, [methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}

const fieldTitle = 'mock-autocomplete-field-title'
const name = 'mock-autocomplete-name'

beforeEach(() => {
  MockAutoCompleteSelect.mockClear()
  MockLabel.mockClear()
  MockFormTextError.mockClear()
})

describe('FormControlAreaAutocomplete', () => {
  it('should render correctly with the correct props', async () => {
    await act(async () => {
      render(
        <FormWrapper
          useFormProps={{
            defaultValues: {
              [name]: '',
            },
            mode: 'all',
          }}
        >
          <FormControlAreaAutocomplete
            fieldTitle={fieldTitle}
            name={name}
            rules={{ required: true }}
          />
        </FormWrapper>,
      )
    })

    expect(screen.getByText('[Label]')).toBeInTheDocument()
    expect(MockLabel).toHaveBeenCalledWith(
      {
        htmlFor: `react-select-${name}-input`,
        required: true,
        children: fieldTitle,
      },
      {},
    )
    expect(MockAutoCompleteSelect).toHaveBeenCalled()
    expect(screen.getByText('[AutoCompleteSelect]')).toBeInTheDocument()

    const expectedProps = expect.objectContaining({
      instanceId: name,
      isMulti: true,
      required: true,
      'aria-required': true,
      placeholder: 'Type to search for an area',
      'aria-invalid': true,
      // its not touched so we don't expect an error message yet even though invalid
      'aria-describedby': undefined,
      loadOptions: mockLoadOptionsDebounced,
      filterOption: mockFilterOption,
    })
    expect(MockAutoCompleteSelect).toHaveBeenCalledWith(expectedProps, {})

    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
  })

  it('should be valid at all times if not required', async () => {
    await act(async () => {
      render(
        <FormWrapper
          useFormProps={{
            defaultValues: {
              [name]: '',
            },
            mode: 'all',
          }}
        >
          <FormControlAreaAutocomplete fieldTitle={fieldTitle} name={name} />
        </FormWrapper>,
      )
    })

    const expectedProps = expect.objectContaining({
      required: false,
      'aria-required': false,
      'aria-invalid': false,
      'aria-describedby': undefined,
    })

    expect(MockAutoCompleteSelect).toHaveBeenCalledWith(expectedProps, {})

    expect(screen.queryByText('[TextError]')).not.toBeInTheDocument()
  })
})
