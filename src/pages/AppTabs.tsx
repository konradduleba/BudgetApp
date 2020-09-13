import {
  IonRouterOutlet, IonPage
} from '@ionic/react';
import React, { useEffect, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage';
import EntryPage from './EntryPage';
import { useAuth } from '../utils/auth'
import AddEntryPage from './AddEntryPage';
import EditPage from './EditPage';
import { CurrencyProvider, CurrencyListContext } from '../utils/CurrencyContext';
import axios from 'axios';

const NBP = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
const SYMBOL = 'https://gist.githubusercontent.com/madnik/49937c83061d1bc0d064/raw/f14d9aa9392b332c9756e06b8d289b9379525e29/currencies.json';

const AppTabs: React.FC = () => {
  const [currencyList, setCurrencyList] = useContext(CurrencyListContext);
  const { loggedIn, welcome } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const nbpData = await axios(NBP);
      const nbpDataRates = nbpData.data[0].rates;

      const symbolData = await axios(SYMBOL);
      const symbolResult = symbolData.data;

      const resultData = mergeData(nbpDataRates, symbolResult);

      setCurrencyList(resultData);
    }

    fetchData();
  }, [setCurrencyList])

  const mergeData = (nbp, symbol) => {
    const codeTables = [];

    nbp.map(({ code: RateCode, mid }) => symbol.map(({ code, symbol, name }) => {
      if (code === RateCode) return codeTables.push({ code, symbol, name, rateForPLN: mid });
      else return null
    }))
    codeTables.unshift({ code: "PLN", symbol: "zł", name: "Polish zlotys", rateForPLN: 1 })
    return codeTables;
  }

  if (welcome) return <Redirect to="/welcome" />
  if (!loggedIn) return <Redirect to="/login" />
  return (
    <CurrencyProvider>
      <IonPage>
        <IonRouterOutlet>
          <Route exact path="/my/entries">
            <HomePage />
          </Route>
          <Route exact path="/my/entries/add">
            <AddEntryPage />
          </Route>
          <Route exact path="/my/entries/view/:id">
            <EntryPage />
          </Route>
          <Route exact path="/my/entries/view/:id/edit">
            <EditPage />
          </Route>
          <Route exact path="/my/settings">
            <SettingsPage />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    </CurrencyProvider>
  );
};

export default AppTabs;
