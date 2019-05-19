import React, { Component } from "react"
import { connect } from "react-redux"
import Modal from "react-native-modal"
import { Calculator } from "react-native-calculator"
import { toggelCalculator } from "../store/actions/index"

import { Container, Button, Icon, Text } from "native-base"

class CCCalculator extends Component {
  render() {
    return (
      <Modal isVisible={this.props.calculator} animationInTiming={800}>
        <Container>
          <Calculator
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
            width={200}
            height={300}
            calcButtonBackgroundColor="#00e9ff"
          />
          <Button iconLeft danger onPress={this.props.onToggleCalculator}>
            <Icon name="close" />
            <Text>Close</Text>
          </Button>
        </Container>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    calculator: state.calculator
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleCalculator: () => dispatch(toggelCalculator())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CCCalculator)
