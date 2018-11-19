import { ADD_CRYPTO_CURRENCIES } from '../actions/types';

const defaultState = {
  cryptoCurrencies: {
    bitcoin: {
      price: 0,
      color: 'black',
      currency: 'USD'
    },
    litecoin: {
      price: 0,
      color: 'black',
      currency: 'USD'
    },
    ethereum: {
      price: 0,
      color: 'black',
      currency: 'USD'
    },
  }
}

export default function cryptoCurrenciesReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_CRYPTO_CURRENCIES:
      return {...state, ...{ cryptoCurrencies: action.payload }}
    default:
      return state;
  }
}