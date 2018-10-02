import React, { Component } from 'react'
import { parse, subDays } from 'date-fns'
import { size, get, isInteger, chain } from 'lodash'
import { Icon, Button, Divider, Header, Input, Segment, Grid, Statistic } from 'semantic-ui-react'
import Trend from './Trend'
import Echarts from 'echarts-for-react'

const RANGE = {
  '3d': { name: '3d', days: 3, displayName: '3 days' },
  '1w': { name: '1w', days: 7, displayName: '1 week' },
  '1m': { name: '1m', days: 30, displayName: '1 month' },
  '3m': { name: '3m', days: 90, displayName: '3 months' },
  '6m': { name: '6m', days: 180, displayName: '6 months' }
}

class Currency extends Component {
  state = {
    duration: '6m',
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

  getChartOption() {
    const {
      data
    } = this.props

    const {
      duration
    } = this.state

    let chartData = []
    let max = 0
    let min = 9999999
    const compareDate = subDays(new Date(), RANGE[duration].days)

    chain(data)
      .get(`${this.symbol}`, [])
      .some(d => {
        const date = parse(d.date, 'yyyyMMdd', new Date())

        chartData.push({
          name: d.date,
          value: d.cash_rate
        })

        return date <= compareDate
      })
      .value()

    chartData.forEach(d => {
      if(d.value < min) {
        min = d.value
      }

      if(d.value > max) {
        max = d.value
      }
    })

    return {
      toolbox: {
        feature: {
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: chartData.map(d => d.name).reverse(),
        splitLine: {
          show: false
        }
      },
      yAxis: {
        min:  parseFloat((min - (max - min) / 2).toPrecision(12)),
        max,
        type: 'value',
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: chartData.map(d => d.value).reverse(),
          animationDelay: function (idx) {
            return idx * 10;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    }
  }

  content() {
    const {
      data
    } = this.props

    const {
      twd,
      duration
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
            <Button.Group>
              {
                chain(RANGE)
                  .map(r => <Button basic={duration !== r.name} color="blue" onClick={() => this.handleDurationChange(r.name)}>{ r.displayName }</Button>)
                  .value()
              }
            </Button.Group>
            <Echarts option={this.getChartOption()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  handleDurationChange = duration => this.setState({ duration })

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
