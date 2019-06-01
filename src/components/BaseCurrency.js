import React, { Component } from "react"
import { connect } from "react-redux"
import { Content, Thumbnail, Spinner } from "native-base"
import CountryInfo from "../assets/counrty_Infomation_handler"

class BaseCurrency extends Component {
  render() {
    return this.props.baseCurrency ? (
      <Thumbnail
        square
        source={CountryInfo[this.props.baseCurrency].flag}
        style={{ marginRight: 10 }}
      />
    ) : (
      <Spinner style={{ marginRight: 10 }} color="gray" />
    )
  }
}

const mapStateToProps = state => {
  return {
    baseCurrency: state.setting.baseCurrency
  }
}

export default connect(
  mapStateToProps,
  null
)(BaseCurrency)
