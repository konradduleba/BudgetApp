import React, { useState, useEffect, useContext } from 'react';
import {
  IonContent,
  IonPage
} from '@ionic/react';
import { useAuth, checkDataProprietyAndAddEntry } from '../utils/auth';
import { useHistory } from 'react-router';
import { CurrencyContext, CurrencyListContext, showAvaibleCurrencies } from '../utils/CurrencyContext';
import { HeaderWithTitleAndBackButton } from '../components/Headers';
import { BudgetInputFields } from '../components/BudgetInputFields';

const AddEntryPage: React.FC = () => {

  const { userId } = useAuth();
  const history = useHistory();
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const [localCurrency, setLocalCurrency] = useState({
    symbol: '',
    code: null,
    rateForPLN: null,
  });
  const [calcCurrency, setCalcCurrency] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const [currency] = useContext(CurrencyContext);
  const [currencyList] = useContext(CurrencyListContext);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencySheet, showCurrencySheet] = useState(false);

  useEffect(() => setCurrencyOptions(showAvaibleCurrencies(setLocalCurrency, currencyList, currency)), [currencyList, currency])

  const handleSave = async () => {
    const data = { amount, date, description, income, expense, currency, currencyList, localCurrency, calcCurrency, userId, id: null }
    const { error, message } = await checkDataProprietyAndAddEntry(data);
    setWarningMessage({ error, message });
    if (!error) history.goBack();
  }

  const handleIncome = () => {
    setIncome(!income);
    setExpense(false)
  }

  const handleExpense = () => {
    setExpense(!expense);
    setIncome(false)
  }

  const data = {
    type: 'add',
    date, setDate,
    description, setDescription,
    expense, handleExpense,
    income, handleIncome,
    calcCurrency, setCalcCurrency,
    amount, setAmount,
    showCurrencySheet, localCurrency, currencySheet, currencyOptions, currency, warningMessage, handleSave, currencyList
  }

  return (
    <IonPage className='app_wrapper pc'>
      <HeaderWithTitleAndBackButton title='Dodaj swój budżet' />
      <IonContent>
        <BudgetInputFields data={data} />
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
