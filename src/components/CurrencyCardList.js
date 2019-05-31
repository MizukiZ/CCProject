import React, { Component, Fragment } from "react"
import { Button, Icon, Text, Content, Spinner } from "native-base"
import { connect } from "react-redux"
import { Grid, Row, Col } from "react-native-easy-grid"

import CurrencyCard from "./CurrencyCard"
import AddCurrency from "./AddCurrency"
class CurrencyCardList extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          {this.props.setting.loaded ? (
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
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}

export default connect(mapStateToProps)(CurrencyCardList)
