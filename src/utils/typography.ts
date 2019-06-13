import * as Typography from 'typography'
import * as Theme from '../theme'

const typography = new Typography.default({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: 'Quicksand',
      styles: [],
    },
  ],
  headerFontFamily: ['Quicksand'],
  headerColor: Theme.Colors.gold.toString(),
  headerWeight: 'normal',
  bodyFontFamily: ['Quicksand'],
})

export default typography
