import { rem } from 'csx'
import * as React from 'react'
import Header from './header'

interface Props {
  children: React.ReactNode
}

export default (props: Props) => (
  <div>
    <Header />
    <div>{props.children}</div>
  </div>
)
