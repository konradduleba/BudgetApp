import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonImg,
} from '@ionic/react';
import { add as addIcon, settingsSharp as optionsIcon, chevronForwardOutline as nextIcon } from 'ionicons/icons';
import React, { useState, useEffect, useContext } from 'react';
import { Entry, toEntry, toGetStatus } from '../utils/models';
import { useAuth, getUserEntriesByUserId } from '../utils/auth';
import emptyWallet from '../img/empty_wallet.png';
import { CurrencyContext } from '../utils/CurrencyContext';
import { HeaderWithTwoOptions } from '../components/Headers';
import { renderBudget, setMainAccountInfo } from '../components/RenderBudget';

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [currency] = useContext(CurrencyContext);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [statusAmount, setStatusAmount] = useState([]);
  const [statusIncome, setStatusIncome] = useState([]);
  const [statusExpense, setStatusExpense] = useState([]);

  useEffect(() => {
    const entriesRef = getUserEntriesByUserId(userId);
    return entriesRef.orderBy('date', 'desc')
      .onSnapshot(({ docs }) => {
        setEntries(docs.map(toEntry));
        const result = toGetStatus(docs, currency.symbol);
        setAllStatus(result);
      });
  }, [userId, currency]);

  const setAllStatus = result => {
    const { amount, income, expense } = setMainAccountInfo(result);
    setStatusAmount(amount);
    setStatusIncome(income);
    setStatusExpense(expense);
  }

  const data = { nextIcon, currency, entries }

  const renderStatus = data => data.map(({ amount, currency }) => <p key={`${amount}${currency}`}>{amount.toFixed(2)}{currency}</p>)

  return (
    <IonPage className='home_page'>
      <HeaderWithTwoOptions
        title='Piggy Budget'
        leftOptionIcon={addIcon}
        leftOptionRouterPath='/my/entries/add'
        rightOptionIcon={optionsIcon}
        rightOptionRouterPath='./settings'
      />
      <IonContent>
        {!entries.length ?
          <IonContent>
            <IonList className="empty_home_page">
              <IonItem lines="none">
                <IonImg src={emptyWallet} className="empty_wallet" />
              </IonItem>
              <IonLabel className="main_text">Coś tu pusto</IonLabel>
              <IonLabel className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, officiis!</IonLabel>
              <IonButton className="login_btn" routerLink="/my/entries/add">Dodaj swój pierwszy budżet</IonButton>
            </IonList>
          </IonContent>

          :

          <IonContent>
            <div className="status">
              {renderStatus(statusAmount)}
              <div className="details">
                <div>
                  <p className="title">Zarobiono</p>
                  {renderStatus(statusIncome)}
                </div>
                <div>
                  <p className="title">Wydano</p>
                  {renderStatus(statusExpense)}
                </div>
              </div>
            </div>
            {renderBudget(data)}
          </IonContent>
        }
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
