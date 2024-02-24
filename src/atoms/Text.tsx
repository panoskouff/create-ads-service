import React from 'react'
import { css as parsePandaCSS } from '../styled-system/css'
import clsx from 'clsx'

type PandaCssProps = Parameters<typeof parsePandaCSS>[0]

export type PandaHTMLElementStyleProps<U extends keyof PandaCssProps> = Merge<
  Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
  Partial<Pick<PandaCssProps, U>>
>

/* prettier-ignore */
type TextElements = Pick<
  React.ReactHTML,
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'p' | 'span' | 'strong' | 'em' | 'small'
>;

type Props = {
  as?: keyof TextElements
  css?: PandaCssProps
} & PandaHTMLElementStyleProps<
  | 'textStyle'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'lineClamp'
  | 'truncate'
  | 'textTransform'
  | 'color'
>

// @todo solve import issue or rename component
export const Text: React.FC<Props> = ({
  as: Element = 'span',
  className,
  textStyle = 'body',
  color = 'text-color-primary',
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  lineClamp,
  truncate,
  textTransform,
  css,
  children,
  ...rest
}) => (
  <Element
    className={clsx(
      className,
      parsePandaCSS({
        textStyle,
        color,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        lineClamp,
        truncate,
        textTransform,
        ...css,
      }),
    )}
    {...rest}
  >
    {children}
  </Element>
)
