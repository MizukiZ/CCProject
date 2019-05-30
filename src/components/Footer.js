import React, { Component } from "react"
import { Footer, FooterTab, Button, Icon } from "native-base"
import { connect } from "react-redux"
import { toggelCalculator } from "../store/actions/index"

class CCFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon
              type="FontAwesome"
              name="home"
              style={{ fontSize: 40, color: "black" }}
            />
          </Button>
          <Button
            onPress={() => {
              this.props.navigationObject.push("History")
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
              this.props.navigationObject.push("Setting")
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
    onToggleCalculator: () => dispatch(toggelCalculator())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CCFooter)
