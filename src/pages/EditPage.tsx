import React, { useState, useEffect, useContext } from 'react';
import {
  IonContent,
  IonPage
} from '@ionic/react';
import { firestore } from '../utils/firebase';
import { useAuth, checkDataProprietyAndAddEntry } from '../utils/auth';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { CurrencyContext, CurrencyListContext, showAvaibleCurrencies } from '../utils/CurrencyContext';
import { HeaderWithTitleAndBackButton } from '../components/Headers';
import { BudgetInputFields } from '../components/BudgetInputFields';


interface RouteParams {
  id: string;
}


const EditPage: React.FC = () => {
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
  });
  const [calcCurrency, setCalcCurrency] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const [currency] = useContext(CurrencyContext);
  const [currencyList] = useContext(CurrencyListContext);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencySheet, showCurrencySheet] = useState(false);


  const { id } = useParams<RouteParams>();

  useEffect(() => {
    setCurrencyOptions(showAvaibleCurrencies(setLocalCurrency, currencyList, currency));
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    entryRef.get().then(doc => {
      setAmount(doc.data().amount);
      setDescription(doc.data().description);
      setDate(doc.data().date);
      setIncome(doc.data().income);
      setExpense(doc.data().expense);
      setLocalCurrency({
        symbol: doc.data().currency,
        code: doc.data().code
      })
    });
  }, [userId, id, currency, currencyList])

  const handleSave = async () => {
    const data = { amount, date, description, income, expense, currency, currencyList, localCurrency, calcCurrency, userId, id };
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
    type: 'edit',
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
      <HeaderWithTitleAndBackButton title='Edytuj' />
      <IonContent>
        <BudgetInputFields data={data} />
      </IonContent>
    </IonPage>
  );
};

export default EditPage;
