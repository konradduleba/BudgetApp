import React from 'react';
import { menuOutline as menuIcon, closeOutline as menuClose } from 'ionicons/icons'
import {
    IonHeader,
    IonToolbar,
    IonItem,
    IonImg,
    IonIcon,
    IonContent
} from '@ionic/react';
import { appLogo } from '../utils/variables';
import { RenderMenuPC } from './RenderMenuPC';

const RenderMenu = ({ menu, showMenu }) => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines="none" slot="start">
                        <IonImg src={appLogo} className="login_photo" />
                    </IonItem>
                    <IonItem lines="none" slot="end" onClick={() => showMenu(!menu)}>
                        <IonIcon src={menu ? menuClose : menuIcon} class="menu_mobile" />
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            {menu &&
                <IonContent>
                    {RenderMenuPC()}
                </IonContent>
            }
        </>
    )
}

export default RenderMenu;