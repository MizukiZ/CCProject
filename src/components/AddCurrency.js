import React, { Component } from "react"
import { Button, Icon, Text } from "native-base"
import { connect } from "react-redux"
import { addCurrency } from "../store/actions/index"
import CountryInfo from "../assets/counrty_Infomation_handler"
import ModalSelector from "react-native-modal-selector"

class AddCurrency extends Component {
  render() {
    let data = Object.keys(CountryInfo).map((currency, i) => {
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

const mapStateToProps = null
const mapDispatchToProps = dispatch => {
  return {
    onAddCurrency: currencyCode => dispatch(addCurrency(currencyCode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrency)
