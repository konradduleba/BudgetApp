import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonInput,
  IonList,
  IonImg
} from '@ionic/react';
import { Redirect } from 'react-router';
import { useAuth, handleRegister } from '../utils/auth';
import { appLogo } from '../utils/variables'


const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState(null);

  const handleRegisterUser = async () => setRegisterMessage(await handleRegister(email, password))

  if (loggedIn) return <Redirect to="my/entries" />

  return (
    <IonPage className='register_page'>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none" slot="start">
            <IonImg src={appLogo} className="login_photo" />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding login_content">
        <h2 className="login_motto">Pamiętaj żeby stworzyć mocne hasło. Ahoj przygodo !</h2>
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
          {registerMessage && <span className={`settings-page_error_message ${registerMessage.error}`}>{registerMessage.message}</span>}
        </IonList>
        <IonButton className="login_btn" onClick={handleRegisterUser}>Zarejestruj</IonButton>
        <p className="login_motto button_space">Masz już konto?</p>
        <IonButton className="login_btn login_register" routerLink="./login">Zaloguj się</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
