import clsx from 'clsx'
import { css } from '../styled-system/css'

const aspectRatioBox = css({
  position: 'relative',
  height: 0,
})

const image = css({
  position: 'absolute',
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: 'lg',
})

/* the way this component is built needs to be
    wrapped in a div that has width set */
type AspectRatioImageProps = {
  width: number
  height: number
} & React.AllHTMLAttributes<HTMLImageElement>

// @todo use picture element to support srcset
export const AspectRatioImage = ({
  src,
  width = 1,
  height = 1,
  className,
  ...rest
}: AspectRatioImageProps) => {
  return (
    <div
      className={clsx(aspectRatioBox, className)}
      style={{
        paddingBottom: `calc(100% / ${width} * ${height})`,
      }}
    >
      {/*
      browser calculates the expected aspect ratio based on width
      and height properties passed to img element
      --> so as long as we pass the same width/height that we used
      in our calculation above - which always happens, this is correct
      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
      // @todo adjust properties passed here to have the intended
      // aspect ratio outcome
       */}
      <img
        className={image}
        src={src}
        width={width}
        height={height}
        {...rest}
      />
    </div>
  )
}
