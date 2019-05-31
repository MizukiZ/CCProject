import React, { Component } from "react"
import { connect } from "react-redux"

import { Container, Content, Button, Thumbnail, Text, Icon } from "native-base"
import { TextInput } from "react-native"
import { Grid, Row, Col } from "react-native-easy-grid"
import BaseCurrency from "./BaseCurrency"
import CountryInfo from "../assets/counrty_Infomation_handler"
import { convertCurrency, roundWithDecimalPoint } from "../helpers/caluculate"
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
              <Text>{CountryInfo[currency].currencyName}</Text>
            </Row>
            <Row style={{ margin: 40 }}>
              <Col size={40} style={{ alignItems: "center" }}>
                <Row>
                  <Text>{this.props.baseCurrency}</Text>
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
                  <Text>{currency}</Text>
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
            <Row />
            <Row />
          </Grid>
        </Content>
      </Container>
    )
  }

  componentDidMount() {
    const currency = this.props.navigation.getParam("currency", "Not found")
    const latestRate = roundWithDecimalPoint(
      this.props.currencyData.latestData[currency],
      4
    )

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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDetail)
