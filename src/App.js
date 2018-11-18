import React, { Component } from 'react';
import axios from 'axios';
import Currency from 'react-currency-formatter';
import { Panel, Row, Col } from "react-bootstrap";
import { ClipLoader } from 'react-spinners';

import './App.css';

const http = axios.create({
  baseURL: `https://api.coinmarketcap.com/v2/`
});

class App extends Component {
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
      <div className="App">
        <div className="App-header">
          <h1>CryptoWallet</h1>
          <div className="App-card">
            <div className="ClipLoader">
              <ClipLoader
                sizeUnit={"px"}
                size={50}
                color={'#CCCCC'}
                loading={this.state.loading}
              />
          </div> 
            <Row>
              <Col xs={6} md={4}>
                <Panel>
                  <Panel.Body>
                    <Currency
                      quantity={this.state.bitcoin}
                      currency="USD"
                    />
                  </Panel.Body>
                  <Panel.Footer><p><b>BTC</b></p></Panel.Footer>
                </Panel>
              </Col>
              <Col xs={6} md={4}>
                <Panel>
                  <Panel.Body>
                    <Currency
                      quantity={this.state.ethereum}
                      currency="USD"
                    />
                  </Panel.Body>
                  <Panel.Footer><p><b>ETH</b></p></Panel.Footer>
                </Panel>
              </Col>
              <Col xsHidden md={4}>
                <Panel>
                  <Panel.Body>
                    <Currency
                      quantity={this.state.litecoin}
                      currency="USD"
                    />
                  </Panel.Body>
                  <Panel.Footer><p><b>LTC</b></p></Panel.Footer>
                </Panel>
              </Col>
            </Row>
            <p className="App-subtext">
              Prices refresh in { this.state.countdown } seconds.
            </p>
          </div>
          <p className="App-subtext">
            Information updates every 30 seconds.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
