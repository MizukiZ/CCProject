/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchCurrencyData } from "./src/store/actions/index"
import DeviceInfo from "react-native-device-info"

// native base component
import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base"

// import components
import CCFooter from "./src/components/Footer"
import CCHeader from "./src/components/Header"

class App extends Component<Props> {
  render() {
    return (
      <Container>
        <CCHeader />
        <Content>
          <Text>Your Device ID is : {DeviceInfo.getUniqueID()}</Text>
        </Content>
        <CCFooter />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCurrencyData: () => dispatch(fetchCurrencyData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
