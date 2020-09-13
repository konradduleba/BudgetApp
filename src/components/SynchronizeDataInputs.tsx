import React, { useState } from 'react';
import { IonButton, IonItem, IonList, IonInput } from '@ionic/react';
import { handleSynchronizeData, registerAndSynchronizeData } from '../utils/auth';

const SynchronizeDataInputs = () => {
    const [loginBtn, setLoginBtn] = useState(false);
    const [registerBtn, setRegisterBtn] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginMessage, setlLoginMessage] = useState({ error: null, message: '' });
    const [registerMessage, setRegisterMessage] = useState({ error: null, message: '' });

    const handleInputData = type => {
        if (type) {
            setLoginBtn(!loginBtn);
            setRegisterBtn(false);
        }
        else {
            setLoginBtn(false);
            setRegisterBtn(!registerBtn);
        }
    }

    const handleSendButton = async type => {
        if (type) await setlLoginMessage(await handleSynchronizeData(email, password));
        else await setRegisterMessage(await registerAndSynchronizeData(email, password));
    }
    return (
        <div className="synchronize_data">
            <p className="synchronize_data_info">Aby przenieść dane potrzebujesz istniejącego konta, jeżeli takowego nie posiadasz, zawsze możesz stworzyć nowe.</p>
            <div className="synchronize_data_options">
                <IonButton expand="block" fill="clear" onClick={() => handleInputData(true)} className='synchronize_data_option login'>Zaloguj</IonButton>
                <IonButton expand="block" fill="clear" onClick={() => handleInputData(false)} className='synchronize_data_option register'>Zarejestruj</IonButton>
            </div>
            {(registerBtn || loginBtn) && <>
                <IonList>
                    <IonItem lines="none">
                        <IonInput type="email" autocomplete="on" required={true} className="login_input onPc" placeholder="Adres email"
                            onIonChange={event => setEmail(event.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem lines="none">
                        <IonInput type="password" required={true} className="login_input onPc" placeholder="Hasło"
                            onIonChange={event => setPassword(event.detail.value)}
                        ></IonInput>
                    </IonItem>
                </IonList>
                {loginBtn &&
                    <>
                        {loginMessage && <span className={`error_message ${loginMessage.error}`}>{loginMessage.message}</span>}
                        <IonButton className="login_btn pc" onClick={() => handleSendButton(true)}>Zaloguj i prześlij dane</IonButton>
                    </>
                }
                {registerBtn &&
                    <>
                        {registerMessage && <span className={`error_message ${registerMessage.error}`}>{registerMessage.message}</span>}
                        <IonButton className="login_btn pc" onClick={() => handleSendButton(false)}>Zarejestruj i prześlij dane</IonButton>
                    </>
                }
            </>
            }
        </div>
    )
}

export default SynchronizeDataInputs;