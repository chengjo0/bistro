import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'
import * as csstips from 'csstips'
import { px, percent, rem } from 'csx'

export default () => (
  <Layout>
    <img
      src="hero.jpg"
      alt="hero"
      className={style({
        gridColumn: '1 / 4',
        maxHeight: (2 / 3) * window.innerHeight,
        width: percent(100),
      })}
    />
    <div
      className={style({
        gridColumn: '2 / 3',
        gridRowStart: '2',
        textAlign: 'justify',
        paddingBottom: rem(2),
      })}
    >
      <div
        className={style({
          ...csstips.vertical,
          ...csstips.centerCenter,
          paddingBottom: rem(2),
          $nest: {
            '&::before': {
              content: '""',
              width: percent(80),
              height: px(2),
              backgroundColor: 'black',
              marginBottom: rem(1),
            },
            '&::after': {
              content: '""',
              width: percent(80),
              height: px(2),
              backgroundColor: 'black',
              marginTop: rem(1),
            },
            '&>h4': {
              marginBottom: rem(1),
            },
            '&>div>span': {
              fontWeight: 'bold',
            },
            '&>div:last-child': {
              paddingTop: rem(0.5),
            },
          },
        })}
      >
        <h4>Opening hours</h4>
        <div>
          <span>Tues - Sat :</span> 11:30 - 14:00 / 17:30 - 21:00
        </div>
        <div>
          <span>Sun :</span> 11:30 - 14:00
        </div>
        <div>
          <span>Mon :</span> Closed
        </div>
        <div>+33 4 50 70 10 48</div>
      </div>
      <div>content</div>
    </div>
  </Layout>
)
