import React, { Component } from "react"
import { Container, Content, Text } from "native-base"

export default class Setting extends Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: "center" },
    title: "Setting"
  }
  render() {
    return (
      <Container>
        <Content>
          <Text> Setting page </Text>
        </Content>
      </Container>
    )
  }
}
