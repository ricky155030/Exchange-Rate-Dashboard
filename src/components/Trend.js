import React, { Component } from 'react'
import { size, get } from 'lodash'
import { Icon, Header, Input, Segment, Grid, Statistic } from 'semantic-ui-react'

export default function Trend(props) {
  const {
    today,
    prev
  } = props

  const diff = parseFloat((today - prev).toPrecision(12))
  const color = diff > 0 ? 'red' : 'green'

  return (
    <div >
      <span style={{ marginRight: '10px', color }}>
        { diff > 0 ? <Icon name="level up alternate" /> : <Icon name="level down alternate" /> }
      </span>
      <span style={{ color }}>{ diff }</span>
    </div>
  )
}
