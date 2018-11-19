import React, { Component } from 'react';
import Currency from 'react-currency-formatter';
import { Panel } from "react-bootstrap";

import './CurrencyCard.css';

export class CurrencyCard extends Component {
  render() {
    return (
      <Panel>
      <Panel.Body className={this.props.color}>
        <Currency
          quantity={this.props.price}
          currency="USD"
        />
      </Panel.Body>
      <Panel.Footer>
        <p>
          <img src={this.props.image} alt={this.props.altName} />
          <b>{this.props.acronym}</b>
        </p>
      </Panel.Footer>
    </Panel>
    );
  }
}
