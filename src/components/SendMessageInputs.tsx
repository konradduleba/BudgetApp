import React, { useState } from 'react';
import { IonInput, IonTextarea } from '@ionic/react';
import emailjs from 'emailjs-com';
import { useAuth } from '../utils/auth';
import { emailjsData } from '../utils/variables';

const SendMessageInputs = () => {
    const { userId } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState({ status: null, message: null });

    const sendMessage = event => {
        event.preventDefault();
        if (name && email && message) {
            const { serviceID, templateID, userID } = emailjsData;
            const templateParams = { message, userId, name, email };

            emailjs.send(serviceID, templateID, templateParams, userID)
                .then(result => setResponseMessage({ status: true, message: 'Wiadomość została wysłana' }),
                    (error) => setResponseMessage({ status: false, message: error.text }));
        }
    };

    return (
        <form className="send_message" onSubmit={sendMessage}>
            <IonInput
                type="text"
                autocomplete="on"
                required={true}
                className="sendData onPc"
                placeholder="Imię i Nazwisko"
                onIonChange={event => setName(event.detail.value)}>
            </IonInput>
            <IonInput
                type="email"
                autocomplete="on"
                required={true}
                className="sendData onPc"
                placeholder="Email"
                onIonChange={event => setEmail(event.detail.value)}>
            </IonInput>
            <IonTextarea
                autoGrow={true}
                value={message}
                placeholder="Wiadomość"
                className="sendData textarea_contact"
                onIonChange={e => setMessage(e.detail.value!)}>
            </IonTextarea>
            <span className={`response_message ${responseMessage.status}`}>{responseMessage.message}</span>
            <input className="send_message_input" type="submit" value="Wyślij" />
        </form>
    )
}

export default SendMessageInputs;

