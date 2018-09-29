import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { Header, Grid, Icon, Segment, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import Summary from './components/Summary'
import Currency from './components/Currency'
import NotFound from './components/NotFound'

const Container = styled.div`
  padding: 30px;
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
                <Menu.Item>
                  <Link to="/">Summary</Link>
                </Menu.Item>
              </Menu>
              <Content basic>
                <Switch>
                  <Route exact path="/" component={Summary} />
                  <Route path="/currency/:symbol" component={Currency} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default App
