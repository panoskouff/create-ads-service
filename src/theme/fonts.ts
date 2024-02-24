import { Mulish, Tinos } from 'next/font/google'
// import localFont from 'next/font/local'

const mulish = Mulish({ subsets: ['latin'], variable: '--mulish' })
const tinos = Tinos({
  subsets: ['latin'],
  weight: '400',
  variable: '--tinos',
})

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { mulish, tinos }
