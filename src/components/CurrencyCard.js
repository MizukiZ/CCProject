import React, { Component } from "react"
import { connect } from "react-redux"

import {
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Button,
  Thumbnail
} from "native-base"
import { Grid, Row, Col } from "react-native-easy-grid"

import CountryInfo from "../assets/counrty_Infomation_handler"
import { roundWithDecimalPoint } from "../helpers/caluculate"

class CurrencyCard extends Component {
  render() {
    const { currency, currencyData } = this.props

    return (
      <Card>
        <CardItem>
          <Grid>
            <Row style={{ alignItems: "center" }}>
              <Col size={25}>
                <Thumbnail square source={CountryInfo[currency].flag} />
              </Col>
              <Col size={35}>
                <Row>
                  <Text>{currency}</Text>
                </Row>
                <Row>
                  <Text>{CountryInfo[currency].currencyName}</Text>
                </Row>
              </Col>
              <Col size={35} style={{ alignItems: "center" }}>
                <Text>
                  {roundWithDecimalPoint(currencyData.latestData[currency], 4)}
                </Text>
              </Col>
              <Col size={5}>
                <Icon name="arrow-forward" />
              </Col>
            </Row>
          </Grid>
        </CardItem>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    currencyData: state.currency
  }
}

export default connect(
  mapStateToProps,
  null
)(CurrencyCard)
