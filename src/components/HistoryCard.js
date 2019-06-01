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
// import { deleteCurrencyFromFirebase } from "../store/actions/index"

class HistoryCard extends Component {
  render() {
    const { timestamp, baseCurrency, otherCurrency, input, result } = this.props

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
                    <Row style={{ alignItems: "center" }}>
                      <Col size={30} style={{ alignItems: "center" }}>
                        <Row>
                          <Thumbnail
                            square
                            source={CountryInfo[baseCurrency].flag}
                          />
                        </Row>
                        <Row>
                          <Text>{input}</Text>
                        </Row>
                      </Col>
                      <Col size={10} style={{ alignItems: "center" }}>
                        <Icon
                          type="FontAwesome"
                          name="exchange"
                          style={{ fontSize: 26 }}
                        />
                      </Col>
                      <Col size={30} style={{ alignItems: "center" }}>
                        <Row>
                          <Thumbnail
                            square
                            source={CountryInfo[otherCurrency].flag}
                          />
                        </Row>
                        <Row>
                          <Text>{result}</Text>
                        </Row>
                      </Col>
                      <Col size={30} style={{ alignItems: "center" }}>
                        <Text>{timestamp}</Text>
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
  currencyNameStyle: {
    color: "grey"
  },
  currencyRateStyle: {
    fontWeight: "bold"
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
