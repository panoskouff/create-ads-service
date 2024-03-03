import { css } from '#/styled-system/css'
import { SystemStyleObject } from '#/styled-system/types'

const formInputStylesBase: SystemStyleObject = {
  _focusNotTouched: {
    borderColor: '#1862b5',
    boxShadow: '0 0 0 4px hsla(0, 0%, 100%, .7), 0 0 0 4px #005bed',
    outline: 'none',
  },
  _touchedValid: {
    borderColor: '#6cb946;',
  },
  _focusTouchedValid: {
    boxShadow: '0 0 0 4px hsla(0,0%,100%,.7), 0 0 0 4px #6cb946',
    outline: 'none',
  },
  _touchedInvalid: {
    borderColor: 'red',
  },
  _focusTouchedInvalid: {
    boxShadow: '0 0 0 4px hsla(0,0%,100%,.7),0 0 0 4px red',
    outline: 'none',
  },
}

export const formInputStyles = css(formInputStylesBase)

const formSelectStylesBase: SystemStyleObject = {
  ...formInputStylesBase,
  _invalid: { color: '#7e7f85' },
}
export const formSelectStyles = css(formSelectStylesBase)

const formInputTextStylesBase: SystemStyleObject = {
  ...formInputStylesBase,
  _touchedValid: {
    ...formInputStylesBase._touchedValid,
    _touchedValid: {
      background:
        '#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAABdklEQVR4AeXZwW3DMAwFUI8goKLRY0YQZPueTZIN2g2SDdoN3FuB2LJG8AgZwSN4hLQ8FOCtEOgIokmA9zwgMMXPam/lQ33xsb5UGqqJ8NYEeGDvHt1McPrDUrQa7G7RbrBHCtw12t3ANcGuiPq3JzhpwcpHu29zSMZij/AlFAtLOtbOirBwd9EYBVhlWB9gUYZ9PQggasX2xqjCtiPcFWD1YOnmM6vB+lD36Vi7Eixvx+xu4MrHgttyoV5zoH2EjxKwjxxoDN1SsdjtYI/PTA8WfASUgu3CyznDQk3QCrAM9KZ/4/f86QELzcAGe91m0I900HPQArBYOLT9L4CNTrgK5Mey0SRN6I1JHHUMrAD0dlgBaJzrxWLZ6AlmdlCOPcJnlbu6mPZjSfcEKyooZ6DrKA7LRYu+CrTpHx75QbkPcFaDZaP5VwH5aFGhWzvYqxosRavBUrQaLEWrwVK0GixF868CwgrfwoygXDZaBZaiyVWguPoBTOcsChkFfL4AAAAASUVORK5CYII=) calc(100% - 15px) 50% / 15px 12px no-repeat;',
      paddingRight: '2.5rem',
    },
  },
}
export const formInputTextStyles = css(formInputTextStylesBase)
