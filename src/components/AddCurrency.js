import React, { Component } from "react"
import { Button, Icon, Text } from "native-base"
import { connect } from "react-redux"
import { addCurrency } from "../store/actions/index"
import CountryInfo from "../assets/counrty_Infomation_handler"
import ModalSelector from "react-native-modal-selector"

class AddCurrency extends Component {
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
          this.props.onAddCurrency(option.customKey)
        }}
      >
        <Button bordered primary>
          <Icon
            type="FontAwesome"
            name="money"
            style={{ fontSize: 30, color: "blue" }}
          />
          <Text>Add Currency</Text>
        </Button>
      </ModalSelector>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayCurrency: state.setting.displayCurrency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCurrency: currencyCode => dispatch(addCurrency(currencyCode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrency)
