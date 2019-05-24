import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet } from "react-native"
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
    const { currencyCode, currencyData } = this.props

    return (
      <Card>
        <CardItem>
          <Grid>
            <Row style={{ alignItems: "center" }}>
              <Col size={25}>
                <Thumbnail square source={CountryInfo[currencyCode].flag} />
              </Col>
              <Col size={35}>
                <Row>
                  <Text>{currencyCode}</Text>
                </Row>
                <Row>
                  <Text style={styles.currencyNameStyle}>
                    {CountryInfo[currencyCode].currencyName}
                  </Text>
                </Row>
              </Col>
              <Col size={35} style={{ alignItems: "center" }}>
                <Text style={styles.currencyRateStyle}>
                  {`${roundWithDecimalPoint(
                    currencyData.latestData[currencyCode],
                    4
                  )} ${CountryInfo[currencyCode].currencySymbol}`}
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

const styles = StyleSheet.create({
  currencyNameStyle: {
    color: "grey"
  },
  currencyRateStyle: {
    fontWeight: "bold"
  }
})

const mapStateToProps = state => {
  return {
    currencyData: state.currency
  }
}

export default connect(
  mapStateToProps,
  null
)(CurrencyCard)
