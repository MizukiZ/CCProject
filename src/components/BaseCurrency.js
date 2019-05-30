import React, { Component } from "react"
import { connect } from "react-redux"

import { Thumbnail } from "native-base"
import CountryInfo from "../assets/counrty_Infomation_handler"

class BaseCurrency extends Component {
  render() {
    return (
      <Thumbnail square source={CountryInfo[this.props.baseCurrency].flag} />
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
