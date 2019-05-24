/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchCurrencyHistoricalData } from "./src/store/actions/index"
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
import CCCalculator from "./src/components/Calculator"
import CurrencyCard from "./src/components/CurrencyCard"
class App extends Component<Props> {
  render() {
    console.log(10 ** 2)
    return (
      <Container>
        <CCCalculator />
        <CCHeader />
        <Content>
          {/* <Text>Your Device ID is : {DeviceInfo.getUniqueID()}</Text>  */}
          <CurrencyCard currencyCode="JPY" />
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
    onFetchCurrencyHistoricalData: () => dispatch(fetchCurrencyHistoricalData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
