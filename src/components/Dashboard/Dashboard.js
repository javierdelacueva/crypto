import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import { addCryptoCurrencies } from '../../store/actions';
import { CardsList } from '../CardsList/CardsList'; 
import './Dashboard.css';

const http = axios.create({
  baseURL: `https://api.coinmarketcap.com/v2/`
});

class Dashboard extends Component {
  state = {
    countdown: 30,
    loading: false,
  }
  componentDidMount() {
    this.getCurrencies();
    this.startInterval();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  startInterval() {
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
  getCurrencies() {
    this.setState({ loading: true })
    axios.all([
      http.get(`ticker/1/`),
      http.get(`ticker/2/`),
      http.get(`ticker/1027/`)
    ])
    .then(axios.spread((bitcoin, litecoin, ethereum) => {
      this.persistCryptoCurrencies(bitcoin, litecoin, ethereum);
      this.setState({ loading: false });
    }))
    .catch(error => console.log(error));
  }
  persistCryptoCurrencies(bitcoin, litecoin, ethereum) {
    this.props.onAddCryptoCurrencies({
      bitcoin: {
        price: this.getCurrencyPrice(bitcoin),
        color: this.getCurrencyColor(
          this.props.cryptoCurrencies.bitcoin.price,
          this.getCurrencyPrice(bitcoin)
        ),
      },
      litecoin: {
        price: this.getCurrencyPrice(litecoin),
        color: this.getCurrencyColor(
          this.props.cryptoCurrencies.litecoin.price,
          this.getCurrencyPrice(litecoin)
        ),
      },
      ethereum: {
        price: this.getCurrencyPrice(ethereum),
        color: this.getCurrencyColor(
          this.props.cryptoCurrencies.ethereum.price,
          this.getCurrencyPrice(ethereum)
        ),
      },
    });
  }
  getCurrencyPrice(currency) {
    return currency.data.data.quotes.USD.price;
  }
  getCurrencyColor(previous, current) {
    let color = 'black';
    if (previous !== 0) {
      if (previous > current) {
        color = 'red';
      } else if (previous < current) {
        color = 'green';        
      }
    }
    return color;
  }
  render() {
    return (
      <CardsList 
        loading={this.state.loading}
        countdown={this.state.countdown}
        cryptoCurrencies={this.props.cryptoCurrencies}
      />
    );
  }
}

Dashboard.propTypes = {
  cryptoCurrencies: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCryptoCurrencies: cryptoCurrencies => {
      dispatch(addCryptoCurrencies(cryptoCurrencies));
    },
  };
};

const mapStateToProps = state => {
  return {
    cryptoCurrencies: state.cryptoCurrencies,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);