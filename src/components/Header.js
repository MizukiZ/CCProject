import React, { Component } from "react"
import { Header, Left, Title, Body, Right, Thumbnail } from "native-base"
import { connect } from "react-redux"

import CountryInfo from "../assets/counrty_Infomation_handler"

class CCHeader extends Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right>
          <Thumbnail
            square
            source={CountryInfo[this.props.setting.baseCurrency].flag}
          />
        </Right>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}

export default connect(mapStateToProps)(CCHeader)
