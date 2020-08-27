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
  IonItem,
  IonList,
  IonInput
} from '@ionic/react';
import { auth } from '../firebase';
import { chevronUpOutline as showIcon, chevronDownOutline as hideIcon, chevronForwardOutline as shareIcon } from 'ionicons/icons';
import { CurrencyContext, CurrencyListContext } from '../CurrencyContext';
import { handleSynchronizeData, registerAndSynchronizeData } from '../auth';
import { HeaderWithTitleAndBackButton } from '../components/Headers';

const SettingsPage: React.FC = () => {
  const [currency, setCurrency] = useContext(CurrencyContext);
  const [currencyList] = useContext(CurrencyListContext);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencySheet, showCurrencySheet] = useState(false);
  const [synchronizeData, setSynchronizeData] = useState(null);
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginMessage, setlLoginMessage] = useState({ error: null, message: '' });
  const [registerMessage, setRegisterMessage] = useState({ error: null, message: '' });

  const handleInputData = type => {
    if (type) {
      setLoginBtn(!loginBtn);
      setRegisterBtn(false);
    }
    else {
      setLoginBtn(false);
      setRegisterBtn(!registerBtn);
    }
  }

  const handleSendButton = async type => {
    if (type) await setlLoginMessage(await handleSynchronizeData(email, password));
    else await setRegisterMessage(await registerAndSynchronizeData(email, password));
  }

  const getLoggedWithoutRegisterValue = () => localStorage.getItem('loggedWithoutRegister');

  useEffect(() => {
    const currencyTable = [];
    currencyList.map(({ symbol, name, code }) => {
      if (code !== currency.code) return currencyTable.push({
        text: `${symbol} - ${name}`,
        handler: () => setCurrency({ symbol, code })
      })
      else return null;
    });
    setCurrencyOptions(currencyTable);
  }, [currencyList, setCurrency, currency])

  return (
    <IonPage>
      <HeaderWithTitleAndBackButton title='Ustawienia' />
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => showCurrencySheet(true)}>Wybierz walutę - {currency.symbol}</IonButton>
        <IonActionSheet
          isOpen={currencySheet}
          onDidDismiss={() => showCurrencySheet(false)}
          buttons={currencyOptions}
          cssClass='currency_class'
        >
        </IonActionSheet>
        {getLoggedWithoutRegisterValue() === 'true' ?
          <>
            <IonButton expand="block" className="settings-page_property" onClick={() => setSynchronizeData(prevState => !prevState)}>Przenieś dane
          {synchronizeData ? <IonIcon icon={showIcon} className="settings-page_icons" /> : <IonIcon icon={hideIcon} className="settings-page_icons" />}
            </IonButton>
            {synchronizeData &&
              <div className="settings-page_synchronizeData">
                <p className="settings-page_synchronizeData_info">Aby przenieść dane potrzebujesz istniejącego konta, jeżeli takowego nie posiadasz, zawsze możesz stworzyć nowe.</p>
                <div className="settings-page_synchronizeData_options">
                  <IonButton expand="block" fill="clear" onClick={() => handleInputData(true)} className='settings-page_synchronizeData_option login'>Zaloguj</IonButton>
                  <IonButton expand="block" fill="clear" onClick={() => handleInputData(false)} className='settings-page_synchronizeData_option register'>Zarejestruj</IonButton>
                </div>
                {(registerBtn || loginBtn) && <>
                  <IonList>
                    <IonItem lines="none">
                      <IonInput type="email" autocomplete="on" required={true} className="login_input" placeholder="Adres email"
                        onIonChange={event => setEmail(event.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem lines="none">
                      <IonInput type="password" required={true} className="login_input" placeholder="Hasło"
                        onIonChange={event => setPassword(event.detail.value)}
                      ></IonInput>
                    </IonItem>
                  </IonList>
                  {loginBtn &&
                    <>
                      {loginMessage && <span className={`settings-page_error_message ${loginMessage.error}`}>{loginMessage.message}</span>}
                      <IonButton className="login_btn" onClick={() => handleSendButton(true)}>Zaloguj i prześlij dane</IonButton>
                    </>
                  }
                  {registerBtn &&
                    <>
                      {registerMessage && <span className={`settings-page_error_message ${registerMessage.error}`}>{registerMessage.message}</span>}
                      <IonButton className="login_btn" onClick={() => handleSendButton(false)}>Zarejestruj i prześlij dane</IonButton>
                    </>
                  }
                </>
                }
              </div>}
          </>
          :
          <IonButton expand="block" className="settings-page_property" onClick={() => console.log('heja')}>Udostępnij zarobki
          <IonIcon icon={shareIcon} className="settings-page_icons" />
          </IonButton>
        }
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
