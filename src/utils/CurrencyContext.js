import React, { useState, createContext } from 'react';

export const CurrencyContext = createContext();
export const CurrencyListContext = createContext();

export const CurrencyListProvider = props => {
    const [currencyList, setCurrencyList] = useState([]);
    return (
        <CurrencyListContext.Provider value={[currencyList, setCurrencyList]}>
            {props.children}
        </CurrencyListContext.Provider>
    )
}

export const showCalulatedCurrency = (currencyList, currency, amount, localCurrency) => {
    const localCurrencyRate = currencyList.filter(currency => currency.symbol === localCurrency.symbol);
    const rateOfCurrency = currencyList.filter(({ code }) => code === currency.code);

    return (parseFloat(amount) * (localCurrencyRate && localCurrencyRate[0] && localCurrencyRate[0].rateForPLN) / (rateOfCurrency && rateOfCurrency[0] && rateOfCurrency[0].rateForPLN)).toFixed(2);
};

export const showAvaibleCurrencies = (setLocalCurrency, currencyList, currency) => {
    const currencyTable = [];

    currencyList.map(({ symbol, name, code, rateForPLN }) => {
        if (code !== currency.code)
            return currencyTable.push({
                text: `${symbol} - ${name}`,
                handler: () => setLocalCurrency({ symbol, code, rateForPLN })
            })

        return null;
    });

    return currencyTable;
}

export const CurrencyProvider = props => {
    const [currency, setCurrency] = useState({
        symbol: ' zł',
        code: 'PLN'
    });


    return (
        <CurrencyContext.Provider value={[currency, setCurrency]}>
            {props.children}
        </CurrencyContext.Provider>
    )
}
