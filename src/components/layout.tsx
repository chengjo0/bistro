import * as React from 'react'
import { Link } from 'gatsby'

interface Props {
  children: React.ReactNode
}

const ListLink = (props: { to: string; children: string }) => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default (props: Props) => (
  <div>
    <header
      style={{
        padding: `0rem 16rem`,
        backgroundColor: 'red',
        height: `6rem`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: `space-between`,
      }}
    >
      <Link to="/">
        <h3>Bistro d'Asie</h3>
      </Link>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <Link to="/about/">
          <h3>About</h3>
        </Link>
        <Link to="/contact/">
          <h3>Contact</h3>
        </Link>
      </div>
    </header>
    <div
      style={{
        margin: `3rem 16rem`,
        maxWidth: `70%`,
      }}
    >
      {props.children}
    </div>
  </div>
)
