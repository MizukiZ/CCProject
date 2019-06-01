import React, { Component, Fragment } from "react"
import { Button, Icon, Text, Content, Spinner } from "native-base"
import { connect } from "react-redux"
import { Grid, Row, Col } from "react-native-easy-grid"

import HistoryCard from "./HistoryCard"

class HistoryCardList extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          {this.props.history.map((history, i) => {
            return (
              <Row key={`card-${i}`}>
                <HistoryCard
                  key={`card-${i}`}
                  baseCurrency={history.baseCurrency}
                  otherCurrency={history.otherCurrency}
                  input={history.input}
                  result={history.result}
                  timestamp={history.timestamp}
                />
              </Row>
            )
          })}
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

export default connect(
  mapStateToProps,
  null
)(HistoryCardList)
