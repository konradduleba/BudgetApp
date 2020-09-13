import React from 'react';
import {
    IonButton,
    IonItem,
    IonInput,
    IonList,
} from '@ionic/react';
import googlePlay from '../img/google_play_logo.png';
import iphone from '../img/iphone.png';
import android from '../img/android.png';
import app_store from '../img/app_store.png';
import { RenderMenuPC } from './RenderMenuPC';
import { appName, loginMotto } from '../utils/variables';

const LoginPageOnPC = ({ setEmail, setPassword, loginMessage, handleLoginUser, handleRegisterUser, loggedWithoutRegister }) => (
    <>
        {RenderMenuPC('/login')}
        <section className="main_content">
            <div className='login_panel'>
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
                    {loginMessage && <span className={`settings-page_error_message ${loginMessage.error} onPC`}>{loginMessage.message}</span>}
                </IonList>
                <div className='login_register_btns'>
                    <IonButton className="login_btn" onClick={handleLoginUser}>Zaloguj się</IonButton>
                    <IonButton className="login_btn orange" onClick={handleRegisterUser}>Zarejestruj</IonButton>
                </div>
                <p className='login_motto or'>lub</p>
                <IonButton className="login_btn without_register" fill="clear" onClick={loggedWithoutRegister}>Kontynuuj bez logowania się</IonButton>
                <div className='app_links'>
                    <img src={googlePlay} alt="google_play" />
                    <img src={app_store} alt="app_store" />
                </div>
            </div>
            <div className='login_photos'>
                <img src={iphone} alt="iphone" className='piggy_app_screen' />
                <img src={android} alt="android" className='piggy_app_screen_android' />
            </div>
        </section>
    </>
)

export default LoginPageOnPC;