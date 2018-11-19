import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { CurrencyCard } from '../CurrencyCard/CurrencyCard';

import './CardsList.css';

import bitcoinImg from './bitcoin.png';
import litecoinImg from './litecoin.png';
import ethereumImg from './ethereum.png';

export class CardsList extends Component {
  render() {
    return (
      <div className="Dashboard">
        { this.props.loading 
          ? <div className="ClipLoader">
              <ClipLoader
                className="ClipLoader"
                sizeUnit={"px"}
                size={50}
                color={'#CCCCC'}
                loading={this.props.loading}
              />              
            </div>
          : null
        }
        <Row>
          <Col xs={6} md={4}>
            <CurrencyCard
              price={this.props.cryptoCurrencies.bitcoin.price}
              image={bitcoinImg}
              altName="bitcoin"
              acronym="BTC"
              color={this.props.cryptoCurrencies.bitcoin.color}
            />
          </Col>
          <Col xs={6} md={4}>
            <CurrencyCard
              price={this.props.cryptoCurrencies.ethereum.price}
              image={ethereumImg}
              altName="ethereum"
              acronym="ETH"
              color={this.props.cryptoCurrencies.ethereum.color}
            />
          </Col>
          <Col xsHidden md={4}>
            <CurrencyCard
              price={this.props.cryptoCurrencies.litecoin.price}
              image={litecoinImg}
              altName="litecoin"
              acronym="LTC"
              color={this.props.cryptoCurrencies.litecoin.color}
            />
          </Col>
        </Row>
        <p className="App-subtext">
          Prices refresh in { this.props.countdown } seconds.
        </p>
      </div>
    );
  }
}
