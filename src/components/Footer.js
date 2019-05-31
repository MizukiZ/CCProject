import React, { Component } from "react"
import { Footer, FooterTab, Button, Icon } from "native-base"
import { connect } from "react-redux"
import { toggelCalculator } from "../store/actions/index"

import { NavigationActions } from "react-navigation"

class CCFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            onPress={() => {
              this.props.onPressIcon("Home")
            }}
          >
            <Icon
              type="FontAwesome"
              name="home"
              style={{ fontSize: 40, color: "black" }}
            />
          </Button>
          <Button
            onPress={() => {
              this.props.onPressIcon("History")
            }}
          >
            <Icon
              type="FontAwesome"
              name="history"
              style={{ fontSize: 40, color: "black" }}
            />
          </Button>
          <Button
            onPress={() => {
              this.props.onPressIcon("Setting")
            }}
          >
            <Icon
              type="FontAwesome"
              name="cogs"
              style={{ fontSize: 40, color: "black" }}
            />
          </Button>
          <Button onPress={this.props.onToggleCalculator}>
            <Icon
              type="FontAwesome"
              name="calculator"
              style={{ fontSize: 40, color: "black" }}
            />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleCalculator: () => dispatch(toggelCalculator()),
    onPressIcon: Route =>
      dispatch(NavigationActions.navigate({ routeName: Route }))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CCFooter)
