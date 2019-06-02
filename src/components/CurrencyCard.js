import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet, TouchableOpacity } from "react-native"
import {
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Button,
  Thumbnail,
  SwipeRow,
  View,
  Toast
} from "native-base"
import { Grid, Row, Col } from "react-native-easy-grid"

import CountryInfo from "../assets/counrty_Infomation_handler"
import { roundWithDecimalPoint } from "../helpers/caluculate"
import { deleteCurrencyFromFirebase } from "../store/actions/index"

import NetInfo from "@react-native-community/netinfo"

class CurrencyCard extends Component {
  render() {
    const { currencyCode, currencyData } = this.props

    return (
      <Content style={{ margin: 5 }}>
        <SwipeRow
          // this mergin is needed to fill the gap between parents Content and child content
          style={{ margin: -9 }}
          disableLeftSwipe
          leftOpenValue={70}
          left={
            <Button
              danger
              onPress={() => {
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
                    this.props.onDeleteCurrency(currencyCode, [
                      ...this.props.displayCurrency
                    ])
                  }
                })
              }}
            >
              <Icon
                type="FontAwesome"
                name="trash"
                style={{ fontSize: 30, color: "black", marginLeft: 26 }}
              />
            </Button>
          }
          body={
            <Content>
              <Card>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigationObject.push("CurrencyDetail", {
                      currency: currencyCode
                    })
                  }}
                >
                  <CardItem>
                    <Grid>
                      <Row style={{ alignItems: "center" }}>
                        <Col size={25}>
                          <Thumbnail
                            square
                            source={CountryInfo[currencyCode].flag}
                          />
                        </Col>
                        <Col size={40}>
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
                      </Row>
                    </Grid>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Content>
          }
        />
      </Content>
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
    currencyData: state.currency,
    displayCurrency: state.setting.displayCurrency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteCurrency: (currencyCode, originalList) =>
      dispatch(deleteCurrencyFromFirebase(currencyCode, originalList))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyCard)
