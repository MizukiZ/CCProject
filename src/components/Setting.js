import React, { Component } from "react"
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body
} from "native-base"

import { TextInput } from "react-native"

import { connect } from "react-redux"
import ModalSelector from "react-native-modal-selector"
import CountryInfo from "../assets/counrty_Infomation_handler"

class Setting extends Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: "center" },
    title: "Setting"
  }

  state = {
    baseCurrencyLabel: null,
    convertionHistorySave: null,
    autoLocation: null
  }
  render() {
    console.log(this.state)
    const avaliableCurrencyList = Object.keys(CountryInfo).filter(currency => {
      // remove used currencies
      return !this.props.setting.displayCurrency.includes(currency)
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
      <Container>
        <Content>
          <ListItem>
            <ModalSelector
              data={data}
              onChange={option => {
                this.setState({ baseCurrencyLabel: option.label })
              }}
            >
              <TextInput
                style={{
                  padding: 10,
                  fontSize: 16
                }}
                editable={false}
                value={`Base Currency: ${this.state.baseCurrencyLabel}`}
              />
            </ModalSelector>
          </ListItem>
          <ListItem>
            <CheckBox
              checked={this.state.convertionHistorySave}
              style={{
                margin: 10
              }}
              onPress={() => {
                // toggle history save check
                this.setState({
                  convertionHistorySave: !this.state.convertionHistorySave
                })
              }}
            />
            <Body>
              <Text>Enable Convertion History Save</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
              style={{
                margin: 10
              }}
              checked={this.state.autoLocation}
              onPress={() => {
                // toggle history save check
                this.setState({
                  autoLocation: !this.state.autoLocation
                })
              }}
            />
            <Body>
              <Text>Enable Auto Country Detection</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    )
  }

  componentDidMount() {
    // set user basecurrency
    const currency = this.props.setting.baseCurrency
    const label = `${CountryInfo[currency].countryEmoji} ${
      CountryInfo[currency].currencyName
    }`

    this.setState({
      baseCurrencyLabel: label,
      convertionHistorySave: this.props.setting.convertionHistorySave,
      autoLocation: this.props.setting.autoLocation
    })
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddCurrency: (currencyCode, originalList) =>
//       dispatch(addCurrencyFromFirebase(currencyCode, originalList))
//   }
// }

export default connect(
  mapStateToProps,
  null
)(Setting)
