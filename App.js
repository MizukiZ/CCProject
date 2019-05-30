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
import { Container, Content } from "native-base"

// import components
import CCFooter from "./src/components/Footer"
import CCHeader from "./src/components/Header"
import CCCalculator from "./src/components/Calculator"
import CurrencyCardList from "./src/components/CurrencyCardList"

class App extends Component<Props> {
  render() {
    return (
      <Container>
        <CCCalculator />
        <CCHeader />
        <Content>
          <CurrencyCardList navigationObject={this.props.navigation} />
        </Content>
        <CCFooter navigationObject={this.props.navigation} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency,
    setting: state.setting
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
