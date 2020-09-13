import { IonItem, IonDatetime } from '@ionic/react';
import { dateTime } from '../utils/variables';
import React from 'react';

export const DatePicker = ({ type, value, onChangeFunction }) => (
    <>
        {type === 'pl' &&
            <IonItem lines="none">
                <IonDatetime
                    doneText={dateTime.doneText}
                    cancelText={dateTime.cancelText}
                    monthShortNames={dateTime.monthShortNames}
                    value={value}
                    className="date_input"
                    placeholder="Kiedy to było?"
                    onIonChange={event => onChangeFunction(event.detail.value)}
                />
            </IonItem>
        }
        {type === 'eng' &&
            <IonItem lines="none">
                <IonDatetime
                    value={value}
                    className="date_input"
                    placeholder="When was it?"
                    onIonChange={event => onChangeFunction(event.detail.value)}
                />
            </IonItem>
        }
    </>
)
