import React, { Component } from "react"
import { Footer, FooterTab, Button, Icon } from "native-base"
import { connect } from "react-redux"
import { toggelCalculator } from "../store/actions/index"

import { NavigationActions } from "react-navigation"

class CCFooter extends Component {
  state = {
    activeSection: "Home"
  }
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: "#F9F9F9" }}>
          <Button
            active={this.state.activeSection == "Home" ? true : false}
            onPress={() => {
              this.props.onPressIcon("Home")
            }}
          >
            <Icon type="FontAwesome" name="home" style={{ fontSize: 40 }} />
          </Button>
          <Button
            active={this.state.activeSection == "History" ? true : false}
            onPress={() => {
              this.props.onPressIcon("History")
            }}
          >
            <Icon type="FontAwesome" name="history" style={{ fontSize: 40 }} />
          </Button>
          <Button
            active={this.state.activeSection == "Setting" ? true : false}
            onPress={() => {
              this.props.onPressIcon("Setting")
            }}
          >
            <Icon type="FontAwesome" name="cogs" style={{ fontSize: 40 }} />
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

  componentDidUpdate(prevProps) {
    if (prevProps.currencyPage != this.props.currencyPage) {
      this.setState({ activeSection: this.props.currencyPage })
    }
  }
}

const mapStateToProps = state => {
  return {
    currencyPage: state.nav.routes[state.nav.routes.length - 1].routeName
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
  mapStateToProps,
  mapDispatchToProps
)(CCFooter)
