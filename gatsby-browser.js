import { px, percent } from 'csx'
import { cssRule } from 'typestyle'

cssRule('html, body', {
  margin: 0,
  padding: 0,
  width: percent(100),
  height: percent(100),
})

cssRule('html', {
  fontSize: px(16),
  $nest: {
    [`@media only screen and (max-width: 1367px)`]: {
      fontSize: px(14),
    },
  },
})
