import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <img
      src="hero.jpg"
      alt="hero"
      className={style({
        gridColumn: '1 / 4',
        maxHeight: rem(50),
        width: percent(100),
      })}
    />
    <div
      className={style({
        gridColumn: '2 / 3',
        gridRowStart: '2',
        textAlign: 'justify',
        paddingBottom: rem(2),
        ...csstips.verticallySpaced(rem(2)),
      })}
    >
      <div
        className={style({
          ...csstips.vertical,
          $nest: {
            '&>h1': {
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
        <h1>Opening hours</h1>
        <div>
          <span>Tues - Sat :</span> 11:30 - 14:00 / 17:30 - 21:00
        </div>
        <div>
          <span>Sun :</span> 11:30 - 14:00
        </div>
        <div>
          <span>Mon :</span> Closed
        </div>
        <div>
          <div>+33 4 50 70 10 48</div>
          <div>1A avenue du Leman, 74200 Thonon-les-Bains</div>
        </div>
      </div>
      <div
        className={style({
          display: 'grid',
          gridTemplateRows: `75% 25%`,
          height: rem(15),
        })}
      >
        <img
          src="hero.jpg"
          alt="hero"
          className={style({
            height: percent(100),
            width: percent(100),
          })}
        />
        <div
          className={style({
            ...csstips.horizontal,
            ...csstips.centerCenter,
            borderWidth: `${px(0)} ${px(2)} ${px(2)} ${px(2)}`,
            borderStyle: 'solid',
            borderBottomLeftRadius: px(3),
            borderBottomRightRadius: px(3),
          })}
        >
          Menu
        </div>
      </div>
      <div
        className={style({
          display: 'grid',
          gridTemplateRows: `75% 25%`,
          height: rem(15),
        })}
      >
        <img
          src="hero.jpg"
          alt="hero"
          className={style({
            height: percent(100),
            width: percent(100),
          })}
        />
        <div
          className={style({
            ...csstips.horizontal,
            ...csstips.centerCenter,
            borderWidth: `${px(0)} ${px(2)} ${px(2)} ${px(2)}`,
            borderStyle: 'solid',
            borderBottomLeftRadius: px(3),
            borderBottomRightRadius: px(3),
          })}
        >
          Starters
        </div>
      </div>
      <div
        className={style({
          display: 'grid',
          gridTemplateRows: `75% 25%`,
          height: rem(15),
        })}
      >
        <img
          src="hero.jpg"
          alt="hero"
          className={style({
            height: percent(100),
            width: percent(100),
          })}
        />
        <div
          className={style({
            ...csstips.horizontal,
            ...csstips.centerCenter,
            borderWidth: `${px(0)} ${px(2)} ${px(2)} ${px(2)}`,
            borderStyle: 'solid',
            borderBottomLeftRadius: px(3),
            borderBottomRightRadius: px(3),
          })}
        >
          Desserts
        </div>
      </div>
    </div>
  </Layout>
)
