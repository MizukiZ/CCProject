import React, { Component, Fragment } from "react"
import { Button, Icon, Text, Content } from "native-base"
import { connect } from "react-redux"
import CurrencyCard from "./CurrencyCard"
import { Grid, Row, Col } from "react-native-easy-grid"

import { addCurrency } from "../store/actions/index"
class CurrencyCardList extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          {this.props.setting.displayCurrency.map(currencyCode => {
            return (
              <Row key={`card-${currencyCode}`}>
                <CurrencyCard
                  key={`card-${currencyCode}`}
                  currencyCode={currencyCode}
                />
              </Row>
            )
          })}
          <Row style={{ justifyContent: "center", marginTop: 20 }}>
            <Button
              bordered
              primary
              onPress={() => {
                console.log("Add currency!!")
                this.props.onAddCurrency("USD")
              }}
            >
              <Icon
                type="FontAwesome"
                name="money"
                style={{ fontSize: 30, color: "blue" }}
              />
              <Text>Add Currency</Text>
            </Button>
          </Row>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCurrency: currencyCode => dispatch(addCurrency(currencyCode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyCardList)
