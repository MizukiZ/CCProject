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
  View
} from "native-base"
import { Grid, Row, Col } from "react-native-easy-grid"

import CountryInfo from "../assets/counrty_Infomation_handler"
import moment from "moment"
// import { deleteCurrencyFromFirebase } from "../store/actions/index"

class HistoryCard extends Component {
  render() {
    const { baseCurrency, otherCurrency, input, result } = this.props
    const timestamp = moment(this.props.timestamp)

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
                // this.props.onDeleteCurrency(currencyCode, [
                //   ...this.props.displayCurrency
                // ])
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
                            source={CountryInfo[baseCurrency].flag}
                          />
                        </Row>
                        <Row>
                          <Text>{`${input}${
                            CountryInfo[baseCurrency].currencySymbol
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
                            source={CountryInfo[otherCurrency].flag}
                          />
                        </Row>
                        <Row>
                          <Text>{`${result}${
                            CountryInfo[otherCurrency].currencySymbol
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
    color: "gray"
  }
})

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onDeleteCurrency: (currencyCode, originalList) =>
//       dispatch(deleteCurrencyFromFirebase(currencyCode, originalList))
//   }
// }

export default connect(
  mapStateToProps,
  null
)(HistoryCard)
