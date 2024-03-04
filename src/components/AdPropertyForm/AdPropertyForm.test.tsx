import { render, screen } from '@testing-library/react'
import { AdPropertyForm, AdPropertyFormProps } from './AdPropertyForm'
import { fireEvent } from '@testing-library/react'
import { any } from 'zod'

var MockFormProvider: jest.Mock
jest.mock('react-hook-form', () => {
  MockFormProvider = jest.fn(({ children }) => (
    <div>
      [FormProvider]
      <div>{children}</div>
    </div>
  ))
  return {
    FormProvider: MockFormProvider,
  }
})

var MockFormControlInputText: jest.Mock
var MockFormControlSelect: jest.Mock
var MockFormControlTextArea: jest.Mock
var MockFormControlAreaAutocomplete: jest.Mock
jest.mock('../FormControl', () => {
  MockFormControlInputText = jest.fn(() => <div>[FormControlInputText]</div>)
  MockFormControlSelect = jest.fn(() => <div>[FormControlSelect]</div>)
  MockFormControlTextArea = jest.fn(() => <div>[FormControlTextArea]</div>)
  MockFormControlAreaAutocomplete = jest.fn(() => (
    <div>[FormControlAreaAutocomplete]</div>
  ))
  return {
    FormControlInputText: MockFormControlInputText,
    FormControlSelect: MockFormControlSelect,
    FormControlTextArea: MockFormControlTextArea,
    FormControlAreaAutocomplete: MockFormControlAreaAutocomplete,
  }
})

const mockMethodsProperty = 'mock-methods-property'
const mockOnSubmit = jest.fn(() => {})

const defaultProps = {
  methods: { mockMethodsProperty },
  onSubmit: mockOnSubmit,
  errorMessage: '',
} as unknown as AdPropertyFormProps

describe('AdPropertyForm', () => {
  it('should render correctly with the correct props', () => {
    render(<AdPropertyForm {...defaultProps} />)

    // it should render all form controls
    expect(MockFormProvider).toHaveBeenCalled()
    expect(MockFormControlInputText).toHaveBeenCalled()
    expect(MockFormControlSelect).toHaveBeenCalled()
    expect(MockFormControlTextArea).toHaveBeenCalled()
    expect(MockFormControlAreaAutocomplete).toHaveBeenCalled()

    // it should forward all props to the correct components
    expect(MockFormProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        mockMethodsProperty,
      }),
      {},
    )

    const form = screen.getByTestId('ad-property-form')
    expect(form).toBeInTheDocument()

    // it should call onSubmit when the form is submitted
    fireEvent.submit(form)
    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('should render an error message when there is one', () => {
    const { rerender } = render(<AdPropertyForm {...defaultProps} />)
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()

    rerender(
      <AdPropertyForm {...defaultProps} errorMessage='mock-error-message' />,
    )
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'mock-error-message',
    )
  })

  it('should initialize all FormControls correctly', () => {
    render(<AdPropertyForm {...defaultProps} />)

    expect(MockFormControlInputText).toHaveBeenCalledWith(
      {
        fieldTitle: expect.any(String),
        name: expect.any(String),
        rules: expect.any(Object),
      },
      {},
    )
    expect(MockFormControlSelect).toHaveBeenCalledWith(
      {
        fieldTitle: expect.any(String),
        name: expect.any(String),
        rules: expect.any(Object),
        options: expect.any(Array),
      },
      {},
    )
    expect(MockFormControlTextArea).toHaveBeenCalledWith(
      {
        fieldTitle: expect.any(String),
        name: expect.any(String),
        rules: expect.any(Object),
      },
      {},
    )
    expect(MockFormControlAreaAutocomplete).toHaveBeenCalledWith(
      {
        fieldTitle: expect.any(String),
        name: expect.any(String),
        rules: expect.any(Object),
      },
      {},
    )
  })

  it('should render a submit button', () => {
    render(<AdPropertyForm {...defaultProps} />)

    expect(
      screen.getByRole('button', { name: 'Submit Ad' }),
    ).toBeInTheDocument()
  })
})
