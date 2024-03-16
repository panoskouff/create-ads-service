import { render } from '@testing-library/react'
import { AdPropertyFormContainer } from './AdPropertyFormContainer'
import React from 'react'

var mockUseForm: jest.Mock
var mockHandleSubmit: jest.Mock
var mockTrigger: jest.Mock
jest.mock('react-hook-form', () => {
  const mockReturnValue = () => {}
  mockHandleSubmit = jest.fn(() => mockReturnValue)
  mockTrigger = jest.fn()
  mockUseForm = jest.fn(() => {
    return {
      handleSubmit: mockHandleSubmit,
      trigger: mockTrigger,
    }
  })

  return {
    useForm: mockUseForm,
  }
})

var mockRouterPush: jest.Mock
jest.mock('next/navigation', () => {
  mockRouterPush = jest.fn(() => 'success')
  return {
    useRouter: jest.fn(() => ({ push: mockRouterPush })),
  }
})

var MockAdPropertyForm: jest.Mock
jest.mock('./AdPropertyForm', () => {
  MockAdPropertyForm = jest.fn(() => <div>[AdPropertyForm]</div>)
  return {
    AdPropertyForm: MockAdPropertyForm,
  }
})

var mockCreateAdMutation: jest.Mock
jest.mock('#/network/mutations', () => {
  mockCreateAdMutation = jest.fn(() => ({
    ok: true,
    data: { errorMessage: '' },
  }))
  return {
    createAdMutation: mockCreateAdMutation,
  }
})

describe('AdPropertyFormContainer', () => {
  it('should render AdPropertyForm and initialize it correctly with react-hook-form', () => {
    const { getByText } = render(<AdPropertyFormContainer />)

    // should initialize useForm correctly
    expect(mockUseForm).toHaveBeenCalledWith({
      defaultValues: {
        propertyTitle: '',
        propertyPrice: '',
        propertyAdType: '',
        propertyAreas: [],
        propertyDescription: '',
      },
      mode: 'all',
      resolver: expect.any(Function),
    })

    // should call trigger to validate all fields onMount
    expect(mockTrigger).toHaveBeenCalled()

    // should render AdPropertyForm with the correct props
    expect(getByText('[AdPropertyForm]')).toBeInTheDocument()

    expect(MockAdPropertyForm).toHaveBeenCalledWith(
      {
        methods: expect.any(Object),
        onSubmit: expect.any(Function),
        errorMessage: '',
      },
      {},
    )
  })

  it('should handle submit functionality correctly', () => {
    render(<AdPropertyFormContainer />)

    const onSubmit = mockHandleSubmit.mock.calls[0][0]

    const mockFormData = { propertyTitle: 'mock-property-title' }

    onSubmit(mockFormData)

    expect(mockCreateAdMutation).toHaveBeenCalledWith(mockFormData)
  })
})
