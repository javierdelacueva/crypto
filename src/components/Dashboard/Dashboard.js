import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { CurrencyCard } from '../CurrencyCard/CurrencyCard';
import './Dashboard.css';

import bitcoinImg from './bitcoin.png';
import litecoinImg from './litecoin.png';
import ethereumImg from './ethereum.png';

const http = axios.create({
  baseURL: `https://api.coinmarketcap.com/v2/`
});

export class Dashboard extends Component {
  state = {
    bitcoin: 0,
    litecoin: 0,
    ethereum: 0,
    countdown: 30,
    loading: false,
  }
  componentDidMount() {
    this.getCurrencies();

    this.interval = setInterval(() => {
      let countdown = this.state.countdown;
      countdown === 0 
        ?countdown = 30
        :countdown--;

      this.setState({ countdown })

      if (countdown === 0) {
        this.getCurrencies();
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getCurrencies() {
    this.setState({ loading: true })
    axios.all([
      http.get(`ticker/1/`),
      http.get(`ticker/2/`),
      http.get(`ticker/1027/`)
    ])
    .then(axios.spread((bitcoin, litecoin, ethereum) => {
      this.setState({ 
        bitcoin: bitcoin.data.data.quotes.USD.price,
        litecoin: litecoin.data.data.quotes.USD.price,
        ethereum: ethereum.data.data.quotes.USD.price,
        loading: false,
      })
    }))
    .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="Dashboard">
        { this.state.loading 
          ? <div className="ClipLoader">
              <ClipLoader
                className="ClipLoader"
                sizeUnit={"px"}
                size={50}
                color={'#CCCCC'}
                loading={this.state.loading}
              />              
            </div>
          : null
        }
        <Row>
          <Col xs={6} md={4}>
            <CurrencyCard
              price={this.state.bitcoin}
              image={bitcoinImg}
              altName="bitcoin"
              acronym="BTC"
            />
          </Col>
          <Col xs={6} md={4}>
            <CurrencyCard
              price={this.state.ethereum}
              image={ethereumImg}
              altName="ethereum"
              acronym="ETH"
            />
          </Col>
          <Col xsHidden md={4}>
            <CurrencyCard
              price={this.state.litecoin}
              image={litecoinImg}
              altName="litecoin"
              acronym="LTC"
            />
          </Col>
        </Row>
        <p className="App-subtext">
          Prices refresh in { this.state.countdown } seconds.
        </p>
      </div>
    );
  }
}
