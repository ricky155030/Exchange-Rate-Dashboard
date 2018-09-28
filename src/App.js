import React, { Component } from 'react'
import { isInteger } from 'lodash'
import { Header, Grid, Icon, Segment, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import Summary from './components/Summary'

const Container = styled.div`
  padding: 20px;
`

const Content = styled(Segment)`
  background-color: #fff !important;
`

class App extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column computer={12} largeScreen={12} tablet={14} mobile={16}>
              <Header size="large" color="grey">
                <Icon name="dollar sign"/>
                Exchange Rate
              </Header>
              <Menu attached="top">
                <Menu.Item>Current</Menu.Item>
                <Menu.Item>History</Menu.Item>
              </Menu>
              <Content basic>
                <Summary />
              </Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default App
