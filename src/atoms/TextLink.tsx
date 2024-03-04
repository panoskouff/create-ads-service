/* @todo
  - avoid css function
  - generic multiple variant approach
 */
import { css } from '../styled-system/css'
import Link, { LinkProps } from 'next/link'
import { cn } from '#/utils'

// @todo add this to test styles definitions ?
const textLink = css({
  display: 'inline-block',
  fontSize: '18px',
  fontWeight: 700,
  fontFamily: 'mulish',
  color: 'text-color-secondary',
  boxShadow: 'inset 0 -1px 0 0 var(--colors-text-color-tertiary)',
  transition: 'all 200ms ease',
  '&:hover': {
    boxShadow: 'inset 0px -7px 0px 0px var(--colors-text-color-tertiary)',
    transform: 'scale(1.025)',
  },
})

const textLinkVariant = css({
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    transform: 'none',
  },
})

export type TextLinkProps = LinkProps & {
  openInNewTab?: boolean
  variant?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const TextLink = ({
  className,
  children,
  href,
  openInNewTab = false,
  variant = false,
  ...rest
}: TextLinkProps) => (
  <Link
    className={cn(textLink, className, variant && textLinkVariant)}
    href={href}
    target={openInNewTab ? '_blank' : undefined}
    rel={openInNewTab ? 'noopener noreferrer' : undefined}
    {...rest}
  >
    {children}
  </Link>
)
