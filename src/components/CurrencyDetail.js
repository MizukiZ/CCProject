import React, { Component } from "react"
import { Container, Content, Text } from "native-base"

export default class CurrencyDetail extends Component {
  render() {
    currency = this.props.navigation.getParam("currency", "Not found")
    return (
      <Container>
        <Content>
          <Text> {currency} </Text>
        </Content>
      </Container>
    )
  }
}
