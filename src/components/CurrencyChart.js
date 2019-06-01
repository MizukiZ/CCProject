import React, { Component } from "react"
import { View, StyleSheet, Text, Image, Button } from "react-native"
import { connect } from "react-redux"
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryTooltip,
  VictoryAxis
} from "victory-native"

class CurrencyChart extends Component {
  render() {
    data = chartFormat(this.props.currencyHistoricalData)

    return (
      <View>
        {this.props.currencyHistoricalData.length != 0 ? (
          <View style={styles.container} pointerEvents="none">
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryArea
                domain={{ y: [data.domain.min, data.domain.max] }}
                style={{
                  data: {
                    fill: "#07EB96",
                    fillOpacity: 0.7,
                    stroke: "#05bf79",
                    strokeWidth: 3
                  }
                }}
                data={data.chartData}
                interpolation="basis"
                alignment="start"
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
              />
              <VictoryAxis dependentAxis scale={{ x: "time" }} />
              <VictoryAxis
                scale={{ x: "time" }}
                style={{ tickLabels: { angle: 30 } }}
              />
            </VictoryChart>
          </View>
        ) : (
          <Text>Loading ...</Text>
        )}
      </View>
    )
  }
}

chartFormat = data => {
  if (data.length == 0) return

  const valueArray = Object.values(data).map(rate => Object.values(rate)[0])
  const minRate = Math.min(...valueArray)
  const maxRate = Math.max(...valueArray)

  let returnData = []
  const orderedDates = Object.keys(data).sort((a, b) => {
    return new Date(a) - new Date(b)
  })
  orderedDates.forEach((date, index) => {
    const dateOb = new Date(date)
    const rateValue = Object.values(data[date])[0]
    if (index % 1 == 0) {
      returnData.push({
        x: dateOb,
        y: rateValue
      })
    }
  })

  return {
    domain: { min: minRate, max: maxRate },
    chartData: returnData
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
})

const mapStateToProps = state => {
  return {
    currencyHistoricalData: state.currency.historicalData
  }
}

export default connect(
  mapStateToProps,
  null
)(CurrencyChart)
