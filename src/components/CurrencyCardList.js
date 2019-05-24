import React, { Component, Fragment } from "react"
import { Button, Icon, Text, Content, Picker, Form } from "native-base"
import { connect } from "react-redux"
import CurrencyCard from "./CurrencyCard"
import { Grid, Row, Col } from "react-native-easy-grid"

import { addCurrency } from "../store/actions/index"
import CountryInfo from "../assets/counrty_Infomation_handler"

class CurrencyCardList extends Component {
  render() {
    console.log(CountryInfo)
    return (
      <Fragment>
        <Grid>
          {this.props.setting.displayCurrency.map(currencyCode => {
            return (
              <Row key={`card-${currencyCode}`}>
                <CurrencyCard
                  key={`card-${currencyCode}`}
                  currencyCode={currencyCode}
                />
              </Row>
            )
          })}
          <Row style={{ justifyContent: "center", marginTop: 20 }}>
            <Button
              bordered
              primary
              onPress={() => {
                console.log("Add currency!!")
                this.props.onAddCurrency("USD")
              }}
            >
              <Icon
                type="FontAwesome"
                name="money"
                style={{ fontSize: 30, color: "blue" }}
              />
              <Text>Add Currency</Text>
            </Button>
          </Row>
        </Grid>

        {/* <Form>
          <Picker
            mode="dropdown"
            headerBackButtonText="Please Select A Currency"
            onValueChange={e => {
              console.log(e)
            }}
          >
            {Object.keys(CountryInfo).map(currency => {
              return (
                <Picker.Item
                  label={`${CountryInfo[currency].countryEmoji} ${
                    CountryInfo[currency].currencyName
                  }`}
                  value={currency}
                />
              )
            })}
          </Picker>
        </Form> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCurrency: currencyCode => dispatch(addCurrency(currencyCode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyCardList)
