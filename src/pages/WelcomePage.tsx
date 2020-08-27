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
import slide1Photo from '../img/slide1.png';

const slideOptions = {
  initialSlide: 0,
  speed: 100
};

const WelcomePage: React.FC = () => {
  const [status, setStatus] = useState('Pomiń');

  const handleSlide = () => setStatus('Zaloguj się');

  const slides = [{
    key: "first_slide",
    photo: slide1Photo,
    text: 'Zaplanuj swoje wydatki z naszą aplikacją.'
  },
  {
    key: "second_slide",
    photo: slide1Photo,
    text: 'Kontroluj swoje finanse z dowolnego miejsca.'
  },
  {
    key: "third_slide",
    photo: slide1Photo,
    text: 'Nie martw się obliczeniami. Zrobimy to wszystko za Ciebie.'
  },
  {
    key: "fourth_slide",
    photo: slide1Photo,
    text: 'Życzymy powodzenia !'
  }]

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonSlides pager={true} options={slideOptions} mode="md" onIonSlideReachEnd={handleSlide}>
          {slides.map(({ key, photo, text }) =>
            <IonSlide key={key}>
              <IonList>
                <IonItem lines="none" className="slide_container">
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
