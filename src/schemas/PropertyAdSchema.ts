import { z } from 'zod'

export const PropertyAdSchema = z.object({
  propertyTitle: z
    .string()
    .min(1, { message: 'Property title cannot be empty' })
    .max(155, { message: 'Property title must be under 155 characters' }),
  propertyPrice: z
    .string()
    .regex(/^\d+$/, { message: 'Property price must contain only numbers' }),
  propertyAdType: z.enum(['rent', 'buy', 'exchange', 'donation']),
  propertyAreas: z.array(
    z.object({
      placeId: z.string().min(1, { message: 'Area ID cannot be empty' }),
      name: z
        .string()
        .min(1, { message: 'Area name cannot be empty' })
        .max(50, { message: 'Area name must be under 50 characters' }),
    }),
  ),
  propertyDescription: z
    .string()
    .max(500, { message: 'Property description must be under 500 characters' })
    .optional(),
})
