import React, { Component } from "react"
import { connect } from "react-redux"
import CurrencyChart from "./CurrencyChart.js"
import { Container, Content, Button, Thumbnail, Text, Icon } from "native-base"
import { TextInput } from "react-native"
import { Grid, Row, Col } from "react-native-easy-grid"
import BaseCurrency from "./BaseCurrency"
import CountryInfo from "../assets/counrty_Infomation_handler"
import {
  convertCurrency,
  roundWithDecimalPoint,
  getComparisonData
} from "../helpers/caluculate"

import { fetchCurrencyHistoricalData } from "../store/actions/index"
class CurrencyDetail extends Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: "center" },
    title: "Details",
    headerRight: <BaseCurrency />
  }

  state = {
    baseInput: "1",
    rate: null,
    result: null
  }

  render() {
    const currency = this.props.navigation.getParam("currency", "Not found")
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{ justifyContent: "center" }}>
              <Thumbnail square source={CountryInfo[currency].flag} />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                {CountryInfo[currency].currencyName}
              </Text>
            </Row>
            <Row style={{ margin: 40 }}>
              <Col size={40} style={{ alignItems: "center" }}>
                <Row>
                  <Text style={{ fontWeight: "bold" }}>
                    {this.props.baseCurrency}
                  </Text>
                </Row>
                <Row>
                  <TextInput
                    style={{
                      borderColor: "gray",
                      borderWidth: 1,
                      minWidth: 60
                    }}
                    keyboardType="number-pad"
                    onChangeText={input => {
                      this.setState({ baseInput: input })
                    }}
                    value={this.state.baseInput}
                  />
                </Row>
              </Col>
              <Col size={20} style={{ alignItems: "center" }}>
                <Button
                  transparent
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    const result = convertCurrency(
                      Number(this.state.baseInput),
                      this.state.rate
                    )
                    roundedResult = roundWithDecimalPoint(result, 4)
                    this.setState({ result: String(roundedResult) })
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="exchange"
                    style={{ fontSize: 26 }}
                  />
                </Button>
              </Col>
              <Col size={40} style={{ alignItems: "center" }}>
                <Row>
                  <Text style={{ fontWeight: "bold" }}>{currency}</Text>
                </Row>
                <Row>
                  <TextInput
                    style={{
                      color: "black"
                    }}
                    editable={false}
                    value={this.state.result}
                  />
                </Row>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                {this.props.currencyData.generalStatement}
              </Text>
              <Text style={{ color: this.props.currencyData.stateColor }}>
                {this.props.currencyData.comaprisonStatement}
              </Text>
            </Row>
            <CurrencyChart />
            <Row />
          </Grid>
        </Content>
      </Container>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // when basecurrency is chaged, fetch new historical data
    if (prevProps.baseCurrency != this.props.baseCurrency) {
      const currency = this.props.navigation.getParam("currency", "Not found")
      this.props.onFetchHistoricalData(this.props.baseCurrency, currency)
    }

    if (
      prevProps.currencyData.latestData != this.props.currencyData.latestData
    ) {
      const latestRate = roundWithDecimalPoint(
        this.props.currencyData.latestData[
          this.props.navigation.getParam("currency", "Not found")
        ],
        4
      )

      //reset state
      this.setState({
        result: String(latestRate),
        rate: latestRate,
        baseInput: "1"
      })
    }
  }

  componentDidMount() {
    const currency = this.props.navigation.getParam("currency", "Not found")
    const latestRate = roundWithDecimalPoint(
      this.props.currencyData.latestData[currency],
      4
    )
    this.props.onFetchHistoricalData(this.props.baseCurrency, currency)

    this.setState({
      result: String(latestRate),
      rate: latestRate
    })
  }
}

const mapStateToProps = state => {
  return {
    currencyData: state.currency,
    baseCurrency: state.setting.baseCurrency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchHistoricalData: (base, other) => {
      dispatch(fetchCurrencyHistoricalData(base, other))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDetail)
