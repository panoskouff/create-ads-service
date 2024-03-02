import { z } from 'zod'
import { escape } from 'validator'
import { PropertyAd } from '#/types'

export const PropertyAdSchema = z.object({
  propertyTitle: z
    .string()
    .min(1, { message: 'Property title cannot be empty' })
    .max(100, { message: 'Property title must be under 100 characters' }),
  propertyPrice: z
    .string()
    .regex(/^\d+$/, { message: 'Property price must contain only numbers' }),
  propertyAdType: z.enum(['rent', 'buy', 'exchange', 'donation']),
  propertyAreas: z.array(
    z.object({
      id: z.string().min(1, { message: 'Area ID cannot be empty' }),
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

export function sanitizePropertyAdData(ad: PropertyAd): PropertyAd {
  return {
    propertyTitle: escape(ad.propertyTitle),
    propertyPrice: escape(ad.propertyPrice),
    propertyAdType: escape(ad.propertyAdType),
    propertyAreas: ad.propertyAreas.map((area) => ({
      id: escape(area.id), // our id shouldn't contain illegal characters so its safe to do this
      name: escape(area.name),
    })),
    propertyDescription: ad.propertyDescription
      ? escape(ad.propertyDescription)
      : undefined,
  }
}
