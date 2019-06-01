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

import {
  changeConvertionHistorySaveFromFirebase,
  changeAutoLocationFromFirebase,
  changeBaseCurrencyFromFirebase,
  fechDeviceSettingsFromFirebase
} from "../store/actions/index"

class Setting extends Component {
  static navigationOptions = {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    title: "Setting",
    headerRight: <Content />
  }

  state = {
    baseCurrencyLabel: null,
    convertionHistorySave: null,
    autoLocation: null
  }
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
      <Container>
        <Content>
          <ListItem>
            <ModalSelector
              data={data}
              onChange={option => {
                this.setState({ baseCurrencyLabel: option.label })
                const currencyCode = option.customKey
                this.props.onChangeBaseCurrency(currencyCode)
              }}
            >
              <TextInput
                style={{
                  padding: 10,
                  fontSize: 16,
                  color: "black"
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
                this.setState(
                  {
                    convertionHistorySave: !this.state.convertionHistorySave
                  },
                  () => {
                    this.props.onChangeHistorySave(
                      this.state.convertionHistorySave
                    )
                  }
                )
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
                this.setState(
                  {
                    autoLocation: !this.state.autoLocation
                  },
                  () => {
                    this.props.onChangeAutoLocation(this.state.autoLocation)
                  }
                )
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // when setting has changed, fech new setting
    if (
      prevProps.setting.autoLocation != this.props.setting.autoLocation ||
      prevProps.setting.convertionHistorySave !=
        this.props.setting.convertionHistorySave
    ) {
      this.props.onFetchDeviceSetting()
    }
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

const mapDispatchToProps = dispatch => {
  return {
    onChangeBaseCurrency: currencyCode => {
      dispatch(changeBaseCurrencyFromFirebase(currencyCode))
    },
    onChangeHistorySave: flag => {
      dispatch(changeConvertionHistorySaveFromFirebase(flag))
    },
    onChangeAutoLocation: flag => {
      dispatch(changeAutoLocationFromFirebase(flag))
    },
    onFetchDeviceSetting: () => {
      dispatch(fechDeviceSettingsFromFirebase())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)
