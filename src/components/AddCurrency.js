import React, { Component } from "react"
import { Button, Icon, Text, Spinner, Toast } from "native-base"
import { connect } from "react-redux"
import { addCurrencyFromFirebase } from "../store/actions/index"
import CountryInfo from "../assets/counrty_Infomation_handler"
import ModalSelector from "react-native-modal-selector"

import NetInfo from "@react-native-community/netinfo"

class AddCurrency extends Component {
  state = {
    isChnageLoaded: true
  }
  render() {
    const avaliableCurrencyList = Object.keys(CountryInfo).filter(currency => {
      // remove used currencies
      return !this.props.displayCurrency.includes(currency)
    })
    let data = avaliableCurrencyList.map((currency, i) => {
      return {
        key: i,
        label: `${CountryInfo[currency].countryEmoji} ${
          CountryInfo[currency].currencyName
        }`,
        customKey: currency
      }
    })

    return (
      <ModalSelector
        data={data}
        cancelButtonAccessibilityLabel={"Cancel Button"}
        onChange={option => {
          NetInfo.fetch().then(state => {
            // initial check if the device is online
            if (!state.isConnected) {
              Toast.show({
                text:
                  "Sorry this app is not operatable with offline environment!",
                buttonText: "Ok",
                type: "danger",
                duration: 60000
              })
            } else {
              // set change loaded false to show spinner
              this.setState({ isChnageLoaded: false })
              this.props.onAddCurrency(option.customKey, [
                ...this.props.displayCurrency
              ])
            }
          })
        }}
      >
        {this.state.isChnageLoaded ? (
          <Button bordered primary>
            <Icon
              type="FontAwesome"
              name="money"
              style={{ fontSize: 30, color: "blue" }}
            />
            <Text style={{ fontFamily: "Kanit-SemiBoldItalic" }}>
              Add Currency
            </Text>
          </Button>
        ) : (
          <Spinner color="gray" />
        )}
      </ModalSelector>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // when display currency is changed
    if (prevProps.displayCurrency != this.props.displayCurrency) {
      // set change loaded true to disappare spinner
      this.setState({ isChnageLoaded: true })
    }
  }
}

const mapStateToProps = state => {
  return {
    displayCurrency: state.setting.displayCurrency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCurrency: (currencyCode, originalList) =>
      dispatch(addCurrencyFromFirebase(currencyCode, originalList))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrency)
