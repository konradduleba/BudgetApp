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
  IonText,
  IonLoading,
  IonImg
} from '@ionic/react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import slide1Photo from '../img/slide1.png';


const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setStatus({ loading: false, error: true });
    }
  };

  if (loggedIn) return <Redirect to="my/entries" />
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none" className="slide_container" slot="start">
            <IonImg src={slide1Photo} className="login_photo" />
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
          {status.error &&
            <IonText color="danger">Coś nie pykło</IonText>
          }
        </IonList>
        <IonButton className="login_btn" onClick={handleRegister}>Zarejestruj</IonButton>
        <p className="login_motto button_space">Masz już konto?</p>
        <IonButton className="login_btn login_register" routerLink="./login">Zaloguj się</IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
