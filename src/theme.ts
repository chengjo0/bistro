import { color, rem, px, rotateX, deg, percent } from 'csx'
import { style } from 'typestyle'

const colors = {
  purple: color('#47243c'),
  darkPurple: color('#3F2324'),
  gold: color('#d0b084'),
  taupe: color('#CEC5B6'),
}

const fonts = {
  Montserrat: 'Montserrat, sans-serif',
}

const fontSizes = {
  title: rem(1.6),
  textLarge: rem(2),
  textMedium: px(20),
  textSmall: rem(1),
}

const styles = {
  brand: style({
    fontFamily: fonts.Montserrat,
    fontWeight: 600,
    fontSize: fontSizes.title,
    textTransform: 'uppercase',
    color: colors.gold.toString(),
  }),
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

export { colors, styles }
