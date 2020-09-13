import React, { useState, useContext, useEffect } from 'react';
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButton,
  IonFooter,
  IonActionSheet,
  IonIcon,
} from '@ionic/react';
import { auth } from '../utils/firebase';
import { chevronUpOutline as showIcon, chevronDownOutline as hideIcon } from 'ionicons/icons';
import { CurrencyContext, CurrencyListContext } from '../utils/CurrencyContext';
import { HeaderWithTitleAndBackButton } from '../components/Headers';
import SendMessageInputs from '../components/SendMessageInputs';
import SynchronizeDataInputs from '../components/SynchronizeDataInputs';

const SettingsPage: React.FC = () => {
  const [currency, setCurrency] = useContext(CurrencyContext);
  const [currencyList] = useContext(CurrencyListContext);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencySheet, showCurrencySheet] = useState(false);
  const [synchronizeData, setSynchronizeData] = useState(null);
  const [sendToMeMessage, showSendToMeMessage] = useState(false);

  const getLoggedWithoutRegisterValue = () => localStorage.getItem('loggedWithoutRegister');

  useEffect(() => {
    const currencyTable = [];
    currencyList.map(({ symbol, name, code }) => {
      if (code !== currency.code) return currencyTable.push({
        text: `${symbol} - ${name}`,
        handler: () => setCurrency({ symbol: ` ${symbol}`, code })
      })
      else return null;
    });
    setCurrencyOptions(currencyTable);
  }, [currencyList, setCurrency, currency])

  return (
    <IonPage className='settings_page pc'>
      <HeaderWithTitleAndBackButton title='Ustawienia' />
      <IonContent className="container">
        <IonButton expand="block" onClick={() => showCurrencySheet(true)} className='choose_btn'>Wybierz walutę - {currency.symbol}</IonButton>
        <IonActionSheet
          isOpen={currencySheet}
          onDidDismiss={() => showCurrencySheet(false)}
          buttons={currencyOptions}
          cssClass='currency_class'
        >
        </IonActionSheet>
        {getLoggedWithoutRegisterValue() === 'true' ?
          <>
            <IonButton expand="block" className="property_send choose_btn" onClick={() => setSynchronizeData(prevState => !prevState)}>Przenieś dane
          {synchronizeData ? <IonIcon icon={showIcon} className="icons" /> : <IonIcon icon={hideIcon} className="icons" />}
            </IonButton>
            {synchronizeData && <SynchronizeDataInputs />}
          </>
          :
          <>
            <IonButton expand="block" className="property_send pc" onClick={() => showSendToMeMessage(!sendToMeMessage)}>Napisz do twórcy
          <IonIcon icon={sendToMeMessage ? showIcon : hideIcon} className="icons" />
            </IonButton>
            {sendToMeMessage && <SendMessageInputs />}
          </>
        }
      </IonContent>
      <IonFooter onClick={() => auth.signOut()}>
        <IonToolbar>
          <IonTitle className="title">Wyloguj się</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
};

export default SettingsPage;
