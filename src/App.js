import React, { useEffect, useState } from 'react';
import './app.scss';
import CurrencyRow from './components/CurrencyRow'
import ApiKey from './services/fetchAPI';

const api = ApiKey();

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(`${api.BASE_API}/latest/USD`)
      .then(res => res.json())
      .then(data => {
        const mainCurrency = Object.keys(data.conversion_rates).find(elem => elem === 'UAH')
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(mainCurrency)
        setExchangeRate(data.conversion_rates[mainCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${api.PAIR_API}/${fromCurrency}/${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.conversion_rate))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Конвертация валют</h1>
      <div className='container'>
          <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
      
    </>
  );
}

export default App;

