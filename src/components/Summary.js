import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isInteger, get } from 'lodash'
import { Message, Flag, Input, Segment, Grid, Button, Icon, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

import symbolMapping from './symbolMapping'
import Table from './Table'
import Trend from './Trend'

const Label = styled.div`
  font-weight: bold;
  margin-right: 5px;
`

class Summary extends Component {
  state = {
    data: [],
    err: null,
    isLoading: false,
    twd: 10000
  }

  componentDidMount() {
    const {
      data
    } = this.props

    if(data.length === 0) {
      this.reload()
    }
  }

  reload = async () => {
    this.setState({ isLoading: true })

    try {
      await this.props.fetchSummaryData()
      this.setState({ 
        err: null,
        isLoading: false 
      })
    } catch (e) {
      this.setState({ 
        err: e.message,
        isLoading: false 
      })
    }
  }

  generateTrendIcon = (todayRate, yesterdayRate) => {
    const trigger = (
      <b>{ todayRate > yesterdayRate ? <Icon size="large" name="caret square up" color="red" /> : <Icon size="large" name="caret square down" color="green" /> }</b>
    )

    const content = (
      <div>
        <b>前一日現金匯率</b>
        <br />
        { yesterdayRate }
      </div>
    )

    return (
      <Popup
        trigger={trigger}
        content={content}
      />
    )
  }

  generateColumn() {
    const {
      twd
    } = this.state

    return [
      {
        name: '',
        index: '',
        render: d => (
          <Trend
            today={d.cash_rate}
            prev={d.cash_rate_prev}
          />
        )
      },
      {
        name: '幣別',
        index: 'symbol',
        render: d => (
          <Link to={`/currency/${d.symbol}`}>
            <Flag name={symbolMapping[d.symbol]} />
            <b>{ d.symbol }</b>
          </Link>
        )
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
    const twd = parseInt(e.target.value, 10)
    if(!isInteger(twd)) {
      return 
    }

    this.setState({ twd })
  }

  render() {
    const {
      twd,
      err,
      isLoading
    } = this.state

    const {
      data
    } = this.props

    return (
      <Segment loading={isLoading} basic>
        {
          err &&
          <Message negative>
            <Message.Header>
              { err }
            </Message.Header>
            <a onClick={this.reload} href="#">
              Retry
            </a>
          </Message>
        }
        {
          !err &&
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Label>TWD $</Label>
                  <Input value={twd} onChange={this.handleInputChange} />
                  <Button size="mini" onClick={this.reload} floated="right">
                    Reload
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <b>
                    資料日期: 
                    { get(data, '0.date') }
                  </b>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Table
              data={data}
              columns={this.generateColumn()}
            />
          </div>
        }
      </Segment>
    )
  }
}

export default Summary;
