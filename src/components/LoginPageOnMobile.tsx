import React from 'react';
import {
    IonButton,
    IonItem,
    IonInput,
    IonList,
    IonContent,
} from '@ionic/react';
import { appName, loginMotto } from '../utils/variables';
import RenderMenu from '../components/RenderMenuMobile';

const LoginPageOnPC = ({ setEmail, setPassword, loginMessage, menu, showMenu, handleLoginUser, loggedWithoutRegister }) => (
    <>
        <RenderMenu menu={menu} showMenu={showMenu} />
        {!menu &&
            <IonContent className="ion-padding login_content">
                <h2 className="app_name">{appName}</h2>
                <p className="login_motto">{loginMotto}</p>
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
        }
    </>
)

export default LoginPageOnPC;