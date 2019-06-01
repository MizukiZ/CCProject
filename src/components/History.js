import React, { Component } from "react"
import { Container, Content, Text } from "native-base"
import { connect } from "react-redux"
import { fetchConvertHistoryFromFirebase } from "../store/actions/index"
import HistoryCardList from "./HistoryCardList"
import DeleteAllHistory from "./DeleteAllHistory"

class History extends Component {
  static navigationOptions = {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    title: "History",
    headerRight: <DeleteAllHistory />
  }

  render() {
    return (
      <Container>
        <Content>{this.props.history && <HistoryCardList />}</Content>
      </Container>
    )
  }

  componentDidMount() {
    this.props.onFetchConvertHistory()
  }
}

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchConvertHistory: () => {
      dispatch(fetchConvertHistoryFromFirebase())
    },
    onDeleteAllHistory: () => {
      dispatch(deleteAllHistoryFromFirebase())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
