import React, { Component } from "react"
import { Container, Content, Text } from "native-base"

export default class History extends Component {
  static navigationOptions = {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    title: "History",

    headerRight: <Content />
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
