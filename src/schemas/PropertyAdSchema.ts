import { z } from 'zod'

export const PropertyAdSchema = z.object({
  propertyTitle: z
    .string()
    .min(1, { message: 'Please add a title for your property' })
    .max(155, { message: 'Property title must be under 155 characters' }),
  propertyPrice: z
    .string()
    .regex(/^\d+$/, { message: 'Property price must contain only numbers' }),
  propertyAdType: z.enum(['rent', 'buy', 'exchange', 'donation'], {
    errorMap: (issue, ctx) => ({
      message: 'Please select and Ad type for your property',
    }),
  }),
  propertyAreas: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Area ID cannot be empty' }),
        label: z
          .string()
          .min(1, { message: 'Area name cannot be empty' })
          .max(50, { message: 'Area name must be under 50 characters' }),
      }),
    )
    .min(1, {
      message: 'Please select the matching area or areas for your property',
    }),
  propertyDescription: z
    .string()
    .max(500, { message: 'Property description must be under 500 characters' })
    .optional(),
})
