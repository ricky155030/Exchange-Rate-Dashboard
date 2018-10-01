import React, { Component } from 'react'
import { size, get, isInteger } from 'lodash'
import { Icon, Divider, Header, Input, Segment, Grid, Statistic } from 'semantic-ui-react'
import Trend from './Trend'

class Currency extends Component {
  state = {
    twd: 10000,
    isLoading: false
  }

  componentWillMount() {
    const {
      match
    } = this.props

    this.symbol = match.params.symbol
  }

  componentDidMount() {
    const {
      data
    } = this.props

    if(size(data[this.symbol]) === 0) {
      this.reload()
    }
  }

  reload = async () => {
    this.setState({ 
      isLoading: true
    })

    await this.props.fetchHistoricalData(this.symbol, 'L6M')

    this.setState({ 
      isLoading: false
    })
  }

  content() {
    const {
      data
    } = this.props

    const {
      twd
    } = this.state

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Statistic.Group widths="three" size="small">
              <Statistic>
                <Statistic.Label>趨勢</Statistic.Label>
                <Statistic.Value>
                  <Trend
                    today={get(data, `${this.symbol}.0.cash_rate`)}
                    prev={get(data, `${this.symbol}.1.cash_rate`)}
                  />
                </Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>現金匯率 ({ get(data, `${this.symbol}.0.date`) })</Statistic.Label>
                <Statistic.Value>{ get(data, `${this.symbol}.0.cash_rate`) }</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>前一日現金匯率 ({ get(data, `${this.symbol}.1.date`) })</Statistic.Label>
                <Statistic.Value>{ get(data, `${this.symbol}.1.cash_rate`) }</Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns="equal">
          <Grid.Column verticalAlign="middle">
            <Header>
              <Icon name="calculator" />
              台幣換匯試算
            </Header>
            <div style={{ fontSize: '18px' }}>
              <Statistic.Group size="small" widths="two">
                <Statistic>
                  <Statistic.Label>TWD</Statistic.Label>
                  <Statistic.Value>
                    <Input value={twd} onChange={this.handleInputChange} style={{ fontSize: '1rem' }} />
                  </Statistic.Value>
                </Statistic>
                <Statistic color="blue">
                  <Statistic.Label>{ this.symbol }</Statistic.Label>
                  <Statistic.Value>
                    <span style={{ fontSize: '3rem', lineHeight: '4rem' }}>
                      { Math.round(twd / get(data, `${this.symbol}.0.cash_rate`)) }
                    </span>
                  </Statistic.Value>
                </Statistic>
              </Statistic.Group>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns="equal">
          <Grid.Column verticalAlign="middle">
            <Header>
              <Icon name="chart line" />
              匯率趨勢圖
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  handleInputChange = e => {
    let twd = parseInt(e.target.value, 10)

    if(!isInteger(twd)) {
      twd = ''
    }

    this.setState({ twd })
  }

  render() {
    const {
      isLoading
    } = this.state

    return (
      <Segment basic loading={isLoading}>
        <Header>
          <Icon name="money" />
          { this.symbol } 匯率
        </Header>
        <Divider hidden />
        {
          !isLoading && this.content()
        }
      </Segment>
    )
  }
}

export default Currency;
