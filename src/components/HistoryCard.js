import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet } from "react-native"
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
import moment from "moment"
import { deleteHistoryFromFirebase } from "../store/actions/index"
import NetInfo from "@react-native-community/netinfo"

class HistoryCard extends Component {
  render() {
    const historyData = this.props.historyData
    const timestamp = moment(historyData.timestamp)

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
                    this.props.onDeleteHistory(historyData.id, [
                      ...this.props.history
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
                <CardItem>
                  <Grid>
                    <Row style={styles.alignCenter}>
                      <Col size={30} style={styles.alignCenter}>
                        <Row>
                          <Thumbnail
                            square
                            source={CountryInfo[historyData.baseCurrency].flag}
                          />
                        </Row>
                        <Row>
                          <Text style={{ fontFamily: "Kanit-Regular" }}>{`${
                            historyData.input
                          }${
                            CountryInfo[historyData.baseCurrency].currencySymbol
                          }`}</Text>
                        </Row>
                      </Col>
                      <Col size={10} style={styles.alignCenter}>
                        <Icon
                          type="FontAwesome"
                          name="exchange"
                          style={{ fontSize: 26 }}
                        />
                      </Col>
                      <Col size={30} style={styles.alignCenter}>
                        <Row>
                          <Thumbnail
                            square
                            source={CountryInfo[historyData.otherCurrency].flag}
                          />
                        </Row>
                        <Row>
                          <Text style={{ fontFamily: "Kanit-Regular" }}>{`${
                            historyData.result
                          }${
                            CountryInfo[historyData.otherCurrency]
                              .currencySymbol
                          }`}</Text>
                        </Row>
                      </Col>
                      <Col size={30} style={styles.alignCenter}>
                        <Row style={styles.alignCenter}>
                          <Text style={styles.timestampStyle}>
                            {timestamp.format("YYYY/MM/DD")}
                          </Text>
                        </Row>
                        <Row style={styles.alignCenter}>
                          <Text style={styles.timestampStyle}>
                            {timestamp.format("hh:mm a")}
                          </Text>
                        </Row>
                      </Col>
                    </Row>
                  </Grid>
                </CardItem>
              </Card>
            </Content>
          }
        />
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: "center"
  },
  timestampStyle: {
    color: "gray",
    fontFamily: "Kanit-Italic"
  }
})

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteHistory: (historyID, originalHistory) =>
      dispatch(deleteHistoryFromFirebase(historyID, originalHistory))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryCard)
