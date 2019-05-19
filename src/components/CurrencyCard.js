import React, { Component } from "react"
// import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Button,
  Thumbnail
} from "native-base"

import FlagImages from "../assets/flag_handler"

class CurrencyCard extends Component {
  render() {
    const { currency } = this.props
    return (
      <Card>
        <CardItem>
          <Thumbnail square source={FlagImages[this.props.currency]} />
          <Text>{currency}</Text>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
    )
  }
}

export default CurrencyCard
