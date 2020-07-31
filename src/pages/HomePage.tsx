import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonButtons,
  IonImg,
  IonText
} from '@ionic/react';
import { add as addIcon, settingsSharp as optionsIcon, chevronForwardOutline as nextIcon } from 'ionicons/icons';
import React, { useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase';
import { Entry, toEntry, toGetStatus } from '../models';
import { useAuth } from '../auth';
import { formatDate } from '../date';
import slide1Photo from '../img/slide1.png';
import { CurrencyContext } from '../CurrencyContext'

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [currency] = useContext(CurrencyContext);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [statusAmount, setStatusAmount] = useState(0);
  const [statusIncome, setStatusIncome] = useState(0);
  const [statusExpense, setStatusExpense] = useState(0);

  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId)
      .collection('entries');
    return entriesRef.orderBy('date', 'desc')
      .onSnapshot(({ docs }) => {
        setEntries(docs.map(toEntry));
        setStatusAmount(toGetStatus(docs, 'amount'));
        setStatusIncome(toGetStatus(docs, 'income'));
        setStatusExpense(toGetStatus(docs, 'expense'));
      });
  }, [userId]);

  const modifyEntries = () => {
    const entryTable = [];
    const modifiedTable = [];
    entries.map(({ date, id, description, amount, expense, income }) => {
      if (entryTable.includes(formatDate(date))) {
        const index = entryTable.indexOf(formatDate(date));
        return modifiedTable[index].utils.push({
          id,
          description,
          amount,
          expense,
          income
        })
      }
      else {
        entryTable.push(formatDate(date));
        return modifiedTable.push({
          date: formatDate(date),
          utils: [{
            id,
            description,
            amount,
            expense,
            income
          }]
        })
      }
    })

    return modifiedTable;
  }

  const renderBudget = () => {

    const modifiedTable = modifyEntries();

    return (
      modifiedTable.map(entry =>
        <div key={entry.date}>
          <p className="home-page_date">{entry.date}</p>
          <ul>
            {entry.utils.map(({ id, description, income, expense, amount }) => <IonItem
              lines="none"
              key={id}
              className="home-page_item_list ion-justify-content-between"
              routerLink={`/my/entries/view/${id}`}>
              <p className="home-page_description">{description}</p>
              <div className="home-page_amount_container">
                <p className={`home-page_income_${income} home-page_expense_${expense}`}>{amount}{currency}</p>
                <IonButton fill="clear" className="home-page_edit_icon">
                  <IonIcon icon={nextIcon} className='home-page_next_icon' />
                </IonButton>
              </div>
            </IonItem>)}
          </ul>
        </div>
      )
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonButtons className='home-page_options_left'>
          <IonButton expand="block" fill="clear" routerLink="/my/entries/add">
            <IonIcon icon={addIcon} className="home-page_icon" />
          </IonButton>
        </IonButtons>
        <IonToolbar>
          <IonTitle className="home-page_title">PiggyApp</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options'>
          <IonButton expand="block" fill="clear" routerLink="./settings">
            <IonIcon icon={optionsIcon} className="home-page_icon" />
          </IonButton>
        </IonButtons>
      </IonHeader>
      <IonContent>
        {!entries.length ?
          <IonContent>
            <IonList className="empty-home-page">
              <IonItem lines="none">
                <IonImg src={slide1Photo} className="slide_photo" />
              </IonItem>
              <IonLabel className="empty-home-page_main_text">Coś tu pusto</IonLabel>
              <IonLabel className="empty-home-page_text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, officiis!</IonLabel>
              <IonButton className="login_btn" routerLink="/my/entries/add">Dodaj swój pierwszy budżet</IonButton>
            </IonList>
          </IonContent>

          :

          <IonContent>
            <div className="home-page_status">
              <IonText className={`home-page_status_amount ${statusAmount < 0 ? false : null}`}>{statusAmount}{currency}</IonText>
              <div className="home-page_details">
                <div>
                  <p className="home-page_status_title">Zarobiono</p>
                  <IonText className="home-page_status_income">{statusIncome}{currency}</IonText>
                </div>
                <div>
                  <p className="home-page_status_title">Wydano</p>
                  <IonText className="home-page_status_expense">{statusExpense}{currency}</IonText>
                </div>
              </div>
            </div>
            {renderBudget()}
          </IonContent>
        }
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
