import React from 'react'
import { css as parsePandaCSS } from '../styled-system/css'
import { cn } from '#/utils'

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

export type TextProps = {
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
  | 'textDecoration'
  | 'fontStyle'
  | 'textAlign'
  | 'color'
>

// @todo solve import issue or rename component
export const Text: React.FC<TextProps> = ({
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
  textAlign,
  textDecoration,
  fontStyle,
  css,
  children,
  ...rest
}) => (
  <Element
    className={cn(
      className,
      parsePandaCSS({
        textStyle,
        color,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        textAlign,
        lineClamp,
        textDecoration,
        fontStyle,
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
