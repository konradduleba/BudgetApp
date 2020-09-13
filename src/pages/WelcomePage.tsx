import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonSlides,
  IonSlide,
  IonList,
  IonItem,
  IonImg,
  IonLabel
} from '@ionic/react';
import { slides } from '../utils/variables';

const slideOptions = {
  initialSlide: 0,
  speed: 100
};

const WelcomePage: React.FC = () => {
  const [status, setStatus] = useState('Pomiń');

  const handleSlide = () => setStatus('Zaloguj się');

  return (
    <IonPage className='welcome_page'>
      <IonContent>
        <IonSlides pager={true} options={slideOptions} mode="md" onIonSlideReachEnd={handleSlide}>
          {slides.map(({ key, photo, text }) =>
            <IonSlide key={key}>
              <IonList>
                <IonItem lines="none">
                  <IonImg src={photo} className="slide_photo" />
                </IonItem>
                <IonLabel className="slide_text">{text}</IonLabel>
              </IonList>
            </IonSlide>)}
        </IonSlides>
        <IonButton expand="block" fill="clear" routerLink="./login" className='skip_button'>{status}</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
