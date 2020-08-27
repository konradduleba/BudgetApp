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
import { useAuth, handleLogin, loggedWithoutRegister } from '../auth';
import slide1Photo from '../img/slide1.png';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null);


  const handleLoginUser = async () => setLoginMessage(await handleLogin(email, password))

  if (loggedIn) return <Redirect to="my/entries" />

  return (
    <IonPage className="login_page">
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none" className="slide_container" slot="start">
            <IonImg src={slide1Photo} className="login_photo" />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding login_content">
        <h2 className="app_name">PiggyBudget</h2>
        <p className="login_motto">Z łatwością kieruj swoimi finansami, planuj swoje wydatki i to wszystko z jednego miejsca.</p>
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
          {loginMessage && <span className={`settings-page_error_message ${loginMessage.error}`}>{loginMessage.message}</span>}
        </IonList>
        <IonButton className="login_btn" onClick={handleLoginUser}>Zaloguj się</IonButton>
        <p className="login_motto">lub</p>
        <IonButton className="login_btn login_register" routerLink="./register">Zarejestruj</IonButton>
        <IonButton className="login_btn without_register" fill="clear" onClick={loggedWithoutRegister}>Kontynuuj bez logowania się</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
