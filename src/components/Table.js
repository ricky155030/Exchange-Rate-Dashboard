import React, { Component } from 'react'
import { chain } from 'lodash'
import { Table as SemanticTable } from 'semantic-ui-react'

class Table extends Component {
  generateHeader() {
    const {
      columns
    } = this.props

    return (
      <SemanticTable.Header>
        <SemanticTable.Row>
        {
          chain(columns)
            .map(d => <SemanticTable.HeaderCell>{ d.name }</SemanticTable.HeaderCell>)
            .value()
        }
        </SemanticTable.Row>
      </SemanticTable.Header>
    )
  }

  generateBody() {
    const {
      data,
      columns
    } = this.props

    return (
      <SemanticTable.Body>
        {
          chain(data)
            .map(d => {
              return (
                <SemanticTable.Row>
                {
                  chain(columns)
                    .map(c => <SemanticTable.Cell>{ c.render ? c.render(d) : d[c.index] }</SemanticTable.Cell>)
                    .value()
                }
                </SemanticTable.Row>
              )
            })
            .value()
        }
      </SemanticTable.Body>
    )
  }

  render() {
    return (
      <SemanticTable celled compact>
        { this.generateHeader() }
        { this.generateBody() }
      </SemanticTable>
    )
  }
}

Table.defaultProps = {
  columns: [],
  data: []
}

export default Table
