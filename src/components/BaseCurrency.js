import React, { Component } from "react"
import { connect } from "react-redux"
import { Thumbnail } from "native-base"
import CountryInfo from "../assets/counrty_Infomation_handler"

class BaseCurrency extends Component {
  render() {
    return (
      this.props.setting.loaded && (
        <Thumbnail
          square
          source={CountryInfo[this.props.setting.baseCurrency].flag}
          style={{ marginRight: 10 }}
        />
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}

export default connect(
  mapStateToProps,
  null
)(BaseCurrency)
