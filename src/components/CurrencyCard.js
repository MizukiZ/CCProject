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

import FlagImages from "../assets/flag_handler"

class CurrencyCard extends Component {
  render() {
    const { currency, currencyData } = this.props

    return (
      <Card>
        <CardItem>
          <Grid>
            <Row style={{ alignItems: "center" }}>
              <Col size={25}>
                <Thumbnail square source={FlagImages[currency]} />
              </Col>
              <Col size={15}>
                <Text>{currency}</Text>
              </Col>
              <Col size={55}>
                <Text>{currencyData.latestData[currency]}</Text>
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
