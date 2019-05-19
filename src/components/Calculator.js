import React, { Component } from "react"
import { connect } from "react-redux"
import Modal from "react-native-modal"
import { Calculator } from "react-native-calculator"
import { toggelCalculator } from "../store/actions/index"

import { Container, Button, Icon, Text } from "native-base"
import { Col, Row, Grid } from "react-native-easy-grid"

class CCCalculator extends Component {
  render() {
    return (
      <Modal isVisible={this.props.calculator} animationInTiming={600}>
        <Container style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
          <Grid>
            <Row size={85}>
              <Calculator
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                width={300}
                height={450}
                borderColor="#000"
              />
            </Row>

            <Row
              size={15}
              style={{
                justifyContent: "center"
              }}
            >
              <Button iconLeft danger onPress={this.props.onToggleCalculator}>
                <Icon name="close" />
                <Text>Close</Text>
              </Button>
            </Row>
          </Grid>
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
