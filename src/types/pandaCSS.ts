import { HTMLStyledProps } from '../styled-system/jsx'

/* These types help us restrict which CSS properties are allowed
per component so we can create separation of concerns for our
atoms and use a composition pattern with css. */

// @todo make a generic PandaComponentProps
export type PandaDivProps<T extends keyof HTMLStyledProps<'div'>> = Merge<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
  Partial<Pick<HTMLStyledProps<'div'>, T>>
>

export type PandaButtonProps<T extends keyof HTMLStyledProps<'button'>> = Merge<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  Partial<Pick<HTMLStyledProps<'button'>, T>>
>
