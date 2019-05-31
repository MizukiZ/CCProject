import React, { Component, Fragment } from "react"
import { Button, Icon, Text, Content, Spinner } from "native-base"
import { connect } from "react-redux"
import { Grid, Row, Col } from "react-native-easy-grid"

import CurrencyCard from "./CurrencyCard"
import AddCurrency from "./AddCurrency"

import {
  fetchCurrencyHistoricalData,
  fetchCurrencyLatestData
} from "../store/actions/index"
class CurrencyCardList extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          {this.props.latestDataLoaded ? (
            this.props.setting.displayCurrency.map(currencyCode => {
              return (
                <Row key={`card-${currencyCode}`}>
                  <CurrencyCard
                    key={`card-${currencyCode}`}
                    navigationObject={this.props.navigationObject}
                    currencyCode={currencyCode}
                  />
                </Row>
              )
            })
          ) : (
            <Spinner color="gray" />
          )}
          <Row style={{ justifyContent: "center", marginTop: 20 }}>
            <AddCurrency />
          </Row>
        </Grid>
      </Fragment>
    )
  }

  componentDidUpdate() {
    // when basecurrency is loaded
    if (this.props.setting.baseCurrency) {
      // fetch currency realated data with base currency
      const base = this.props.setting.baseCurrency
      this.props.onFetchCurrencyLatestData(base)
    }
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting,
    latestDataLoaded: state.currency.latestDataLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCurrencyLatestData: baseCurrency =>
      dispatch(fetchCurrencyLatestData(baseCurrency))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyCardList)
