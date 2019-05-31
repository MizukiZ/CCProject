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
import { Container, Content, Thumbnail } from "native-base"

// import components
import CCFooter from "./src/components/Footer"
import CCHeader from "./src/components/Header"
import CCCalculator from "./src/components/Calculator"
import CurrencyCardList from "./src/components/CurrencyCardList"
import BaseCurrency from "./src/components/BaseCurrency"

class App extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    title: "Dashboard",
    headerRight: <BaseCurrency />,
    headerLeft: <Content /> // need this to center title for android
  })

  render() {
    return (
      <Container>
        <CCCalculator />
        <Content>
          <CurrencyCardList navigationObject={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

export default App
