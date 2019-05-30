import React, { Component } from "react"
import { Container, Content, Text } from "native-base"

export default class History extends Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: "center" },
    title: "History"
  }
  render() {
    return (
      <Container>
        <Content>
          <Text> History page </Text>
        </Content>
      </Container>
    )
  }
}
