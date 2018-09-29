import React, { Component } from 'react'
import { Icon, Header, Segment } from 'semantic-ui-react'
import { fetchExchangeRateByRange } from '../services/currency'

class Currency extends Component {
  state = {
    data: [],
    isLoading: false
  }

  componentDidMount() {
    this.reload()
  }

  reload = async () => {
    const {
      match
    } = this.props

    this.setState({ 
      isLoading: true
    })

    const symbol = match.params.symbol

    const data = await fetchExchangeRateByRange(symbol, 'L6M')

    this.setState({ 
      data,
      isLoading: false
    })
  }

  render() {
    const {
      match
    } = this.props

    const {
      data,
      isLoading
    } = this.state

    return (
      <Segment basic loading={isLoading}>
        <Header>
          <Icon name="money" />
          { match.params.symbol }
        </Header>
      </Segment>
    )
  }
}

export default Currency;
