import React from 'react'

const CurrencyRow = ({currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount}) => {
  return (
    <>
      <div>
        <input type="number" className="input" value={amount} onChange={onChangeAmount} />
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map((option, id) => (
            <option key={id} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
    
  )
}

export default CurrencyRow;