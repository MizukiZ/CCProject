import React, { Component } from "react"
import { connect } from "react-redux"
import { Content, Button, Icon } from "native-base"
import { Alert } from "react-native"
import { deleteAllHistoryFromFirebase } from "../store/actions/index"

class DeleteAllHistory extends Component {
  render() {
    return (
      <Content>
        <Button
          transparent
          onPress={() => {
            Alert.alert(
              "Delete All Histories",
              "Are You Sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    // do notinge
                  },
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: () => {
                    // delete all histories
                    this.props.onDeleteAllHistory()
                  }
                }
              ],
              { cancelable: false }
            )
          }}
        >
          <Icon
            type="FontAwesome"
            name="trash"
            style={{ fontSize: 30, color: "red" }}
          />
        </Button>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteAllHistory: () => {
      dispatch(deleteAllHistoryFromFirebase())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAllHistory)
