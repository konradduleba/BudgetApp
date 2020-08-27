import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonIcon, IonButton } from '@ionic/react';
import { chevronBackOutline as backIcon } from 'ionicons/icons';
import React from 'react';

export const HeaderWithTitleAndBackButton = ({ title }) => (
    <IonHeader>
        <IonToolbar>
            <IonTitle className="home-page_title">{title}</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options_settings_place'>
            <IonBackButton icon={backIcon} className="home-page_icon" />
        </IonButtons>
    </IonHeader>
)

export const HeaderWithTwoOptions = ({ title, leftOptionIcon, leftOptionRouterPath, rightOptionIcon, rightOptionRouterPath }) => (
    <IonHeader>
        <IonButtons className='home-page_options_left'>
            <IonButton expand="block" fill="clear" routerLink={leftOptionRouterPath}>
                <IonIcon icon={leftOptionIcon} className="home-page_icon" />
            </IonButton>
        </IonButtons>
        <IonToolbar>
            <IonTitle className="home-page_title">{title}</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options'>
            <IonButton expand="block" fill="clear" routerLink={rightOptionRouterPath}>
                <IonIcon icon={rightOptionIcon} className="home-page_icon" />
            </IonButton>
        </IonButtons>
    </IonHeader>
)

export const HeaderWithOneFunctionOption = ({ title, functionIcon, handleFunction }) => (
    <IonHeader>
        <IonToolbar>
            <IonTitle className="home-page_title">{title}</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options_settings_place'>
            <IonBackButton icon={backIcon} className="home-page_icon" />
        </IonButtons>
        <IonButtons className='home-page_options'>
            <IonButton expand="block" fill="clear" onClick={handleFunction}>
                <IonIcon icon={functionIcon} className="home-page_icon function" />
            </IonButton>
        </IonButtons>
    </IonHeader>
)