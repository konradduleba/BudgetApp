import React, { useState, useContext, useEffect } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonBackButton,
  IonFooter,
  IonActionSheet
} from '@ionic/react';
import { auth } from '../firebase';
import { chevronBackOutline as backIcon } from 'ionicons/icons';
import { CurrencyContext } from '../CurrencyContext';
import axios from 'axios';

const SettingsPage: React.FC = () => {
  const [currency, setCurrency] = useContext(CurrencyContext);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencySheet, showCurrencySheet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://gist.githubusercontent.com/madnik/49937c83061d1bc0d064/raw/f14d9aa9392b332c9756e06b8d289b9379525e29/currencies.json');
      const data = result.data;
      const currencyTable = [];
      data.map(element => currencyTable.push({
        text: `${element.symbol} - ${element.name}`,
        handler: () => setCurrency(` ${element.symbol}`)
      }));
      setCurrencyList(currencyTable);
    };
    fetchData();
  }, [setCurrency])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="home-page_title">Ustawienia</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options_settings_place'>
          <IonBackButton icon={backIcon} className="home-page_icon" />
        </IonButtons>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => showCurrencySheet(true)}>Wybierz walutę - {currency}</IonButton>
        <IonActionSheet
          isOpen={currencySheet}
          onDidDismiss={() => showCurrencySheet(false)}
          buttons={currencyList}
          cssClass='currency_class'
        >
        </IonActionSheet>
      </IonContent>
      <IonFooter onClick={() => auth.signOut()}>
        <IonToolbar>
          <IonTitle className="home-page_title">Wyloguj się</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
};

export default SettingsPage;
