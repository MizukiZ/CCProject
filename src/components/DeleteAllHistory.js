import React, { Component } from "react"
import { connect } from "react-redux"
import { Content, Button, Icon, Toast } from "native-base"
import { Alert } from "react-native"
import { deleteAllHistoryFromFirebase } from "../store/actions/index"
import NetInfo from "@react-native-community/netinfo"

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
                    NetInfo.fetch().then(state => {
                      // initial check if the device is online
                      if (!state.isConnected) {
                        Toast.show({
                          text:
                            "Sorry this app is not operatable with offline environment!",
                          buttonText: "Ok",
                          type: "danger",
                          duration: 60000
                        })
                      } else {
                        this.props.onDeleteAllHistory()
                      }
                    })
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
