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

// native base component
import { Container, Content, Thumbnail, Toast } from "native-base"

// import components
import CCFooter from "./src/components/Footer"
import CCHeader from "./src/components/Header"
import CCCalculator from "./src/components/Calculator"
import CurrencyCardList from "./src/components/CurrencyCardList"
import BaseCurrency from "./src/components/BaseCurrency"

import Geocoder from "react-native-geocoder"
import { countries, currencies, lookup } from "country-data"

import { changeBaseCurrencyFromFirebase } from "./src/store/actions/index"
import NetInfo from "@react-native-community/netinfo"
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

  autoLocationDetection = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        Geocoder.geocodePosition(userPosition).then(res => {
          // res is an Array of geocoding object (see below)
          const countryCode = res[0].countryCode
          const currencyCode = countries[countryCode].currencies[0]

          if (this.props.baseCurrency != currencyCode) {
            this.props.onChangeBaseCurrency(currencyCode)
          }
        })
      },
      error => {}
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // when user sets autolocation true
    if (!prevProps.autoLocation && this.props.autoLocation) {
      this.autoLocationDetection()
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      // initial check if the device is online
      if (!state.isConnected) {
        Toast.show({
          text: "Sorry this app is not operatable with offline environment!",
          buttonText: "Ok",
          type: "danger",
          duration: 60000
        })
      }
    })
    // if autoLacation is enabled
    if (this.props.autoLocation) {
      this.autoLocationDetection()
    }
  }
}

const mapStateToProps = state => {
  return {
    baseCurrency: state.setting.baseCurrency,
    autoLocation: state.setting.autoLocation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeBaseCurrency: currencyCode => {
      dispatch(changeBaseCurrencyFromFirebase(currencyCode))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
