import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class NotFound extends Component {
  render() {
    const {
      match
    } = this.props

    return (
      <Message
        negative
        header="找不到頁面"
        content={`請確認您輸入的網址是否有誤 (${window.location.href})`}
      />
    )
  }
}

export default NotFound
