import React, { Component } from 'react'
import { isInteger } from 'lodash'
import { Input, Segment, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { fetchExchangeRateCurrent } from '../services/currency'
import Table from './Table'

const Label = styled.div`
  font-weight: bold;
  margin-right: 5px;
`

class Summary extends Component {
  state = {
    data: [],
    isLoading: true,
    twd: 10000
  }

  componentDidMount() {
    this.reload()
  }

  reload = async () => {
    this.setState({ isLoading: true })

    const data = await fetchExchangeRateCurrent()

    this.setState({ 
      data,
      isLoading: false
    })

  }

  generateColumn() {
    const {
      twd
    } = this.state

    return [
      {
        name: '幣別',
        index: 'symbol',
        render: d => <b>{ d.symbol }</b>
      },
      {
        name: '現金匯率',
        index: 'cash_rate'
      },
      {
        name: '現金匯率交易試算',
        render: d => {
          return (
            <div>
              <b>{ d.cash_rate > 0 && Math.round(twd / d.cash_rate) }</b>
            </div>
          )
        }
      },
      {
        name: '即期匯率',
        index: 'spot_rate'
      },
      {
        name: '即期匯率交易試算',
        render: d => {
          return (
            <div>
              <b>{ d.spot_rate > 0 && Math.round(twd / d.spot_rate) }</b>
            </div>
          )
        }
      },
      {
        name: '即期 / 現金匯率價差',
        render: d => {
          return (
            <div>
              <b>{ d.spot_rate > 0 && d.cash_rate > 0 && Math.round(twd / d.spot_rate) - Math.round(twd / d.cash_rate) }</b>
            </div>
          )
        }
      }
    ]
  }

  handleInputChange = e => {
    const twd = parseInt(e.target.value)
    if(!isInteger(twd)) {
      return 
    }

    this.setState({ twd })
  }

  render() {
    const {
      twd,
      data,
      isLoading
    } = this.state

    return (
      <Segment loading={isLoading} basic>
        <Label>TWD $</Label>
        <Input value={twd} onChange={this.handleInputChange} />
        <Button size="mini" onClick={this.reload} floated="right">
          Reload
        </Button>
        <Table
          data={data}
          columns={this.generateColumn()}
        />
      </Segment>
    )
  }
}

export default Summary;
