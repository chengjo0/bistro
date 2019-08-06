import { color, rem, px, rotateX, deg, percent } from 'csx'
import { style, types, media } from 'typestyle'

interface IBreakpoints {
  mobile: types.NestedCSSProperties
  desktop: types.NestedCSSProperties
}

export function breakpoints(bps: IBreakpoints): types.NestedCSSProperties[] {
  return [
    media({ type: 'screen', minWidth: px(0), maxWidth: px(1024) }, bps.mobile),
    media({ type: 'screen', minWidth: px(1025) }, bps.desktop),
  ]
}

export const colors = {
  purple: color('#3b1f32'),
  darkPurple: color('#3F2324'),
  gold: color('#d0b084'),
  taupe: color('#CEC5B6'),
  black: color('#000'),
}

export const fonts = {
  Montserrat: 'Montserrat, sans-serif',
  title: 'Oswald, sans-serif',
}

export const fontSizes = {
  title: rem(1.6),
  textLarge: rem(2),
  textMedium: px(20),
  textSmall: rem(1),
  textExtraSmall: rem(0.7),
}

export const paddings = {
  mobile: px(25),
  desktop: px(250),
}

export const headerHeight = {
  mobile: rem(5),
  desktop: rem(6),
}

export const styles = {
  title: style({
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 500,
    fontSize: fontSizes.textLarge,
  }),
  toggle: style({
    padding: `${rem(1)} ${rem(0)} ${rem(1)} ${rem(1)}`,
    fontSize: rem(1.5),
    color: colors.gold.toString(),
  }),
  animateToggle: (openMenu: Boolean) =>
    style({
      transition: 'transform .5s ease',
      transform: rotateX(deg(openMenu ? 180 : 0)),
    }),
  menu: style({
    display: 'flex',
    position: 'fixed',
    top: rem(4),
    right: px(0),
    width: percent(100),
    overflowY: 'hidden',
    $nest: {
      '@media screen and (min-width: 500px)': {
        top: rem(6),
      },
    },
  }),
  animateMenu: (openMenu: Boolean) =>
    style({
      transition: 'height .5s ease',
      height: openMenu ? rem(20) : rem(0),
    }),
}
