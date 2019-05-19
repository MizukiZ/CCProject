import React, { Component } from "react"
import { Footer, FooterTab, Button, Icon } from "native-base"

const CCFooter = () => {
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
        <Button>
          <Icon
            type="FontAwesome"
            name="history"
            style={{ fontSize: 40, color: "black" }}
          />
        </Button>
        <Button>
          <Icon
            type="FontAwesome"
            name="cogs"
            style={{ fontSize: 40, color: "black" }}
          />
        </Button>
        <Button>
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

export default CCFooter
