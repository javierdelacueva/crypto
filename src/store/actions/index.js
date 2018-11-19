import { ADD_CRYPTO_CURRENCIES } from './types';

export const addCryptoCurrencies = (cryptoCurrencies) => ({
  type: ADD_CRYPTO_CURRENCIES,
  payload: cryptoCurrencies
});
