import React, { Component } from "react"
import { Header, Left, Title, Body, Right } from "native-base"

const CCHeader = () => {
  return (
    <Header>
      <Left />
      <Body>
        <Title>Dashboard</Title>
      </Body>
      <Right />
    </Header>
  )
}

export default CCHeader
