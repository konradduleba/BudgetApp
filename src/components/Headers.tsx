import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonIcon, IonButton } from '@ionic/react';
import { chevronBackOutline as backIcon } from 'ionicons/icons';
import { AiFillDelete as DeleteIcon } from 'react-icons/ai';
import React from 'react';

export const HeaderWithTitleAndBackButton = ({ title }) => (
    <IonHeader className='header_component'>
        <IonToolbar>
            <IonTitle className="title">{title}</IonTitle>
        </IonToolbar>
        <IonButtons className='options_settings_place'>
            <IonBackButton icon={backIcon} className="icon" />
        </IonButtons>
    </IonHeader>
)

export const HeaderWithTwoOptions = ({ title, leftOptionIcon, leftOptionRouterPath, rightOptionIcon, rightOptionRouterPath }) => (
    <IonHeader className='header_component'>
        <IonButtons className='options_left'>
            <IonButton expand="block" fill="clear" routerLink={leftOptionRouterPath}>
                <IonIcon icon={leftOptionIcon} className="icon" />
            </IonButton>
        </IonButtons>
        <IonToolbar>
            <IonTitle className="title">{title}</IonTitle>
        </IonToolbar>
        <IonButtons className='options'>
            <IonButton expand="block" fill="clear" routerLink={rightOptionRouterPath}>
                <IonIcon icon={rightOptionIcon} className="icon" />
            </IonButton>
        </IonButtons>
    </IonHeader>
)

export const HeaderWithOneFunctionOption = ({ title, handleFunction, moveBackFunction }) => (
    <IonHeader className='header_component'>
        <IonToolbar>
            <IonTitle className="title">{title}</IonTitle>
        </IonToolbar>
        <IonButtons className='options_settings_place'>
            <IonIcon src={backIcon} className="icon pad_left" onClick={moveBackFunction} />
        </IonButtons>
        <IonButtons className='options'>
            <IonButton expand="block" fill="clear" onClick={handleFunction}>
                <DeleteIcon className="icon function" />
            </IonButton>
        </IonButtons>
    </IonHeader>
)