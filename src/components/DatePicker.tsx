import { IonItem, IonDatetime } from '@ionic/react';
import { dateTime } from '../utils/variables';
import React from 'react';

const getDateTimeValues = (lang, value) => dateTime[lang][value];

export const DatePicker = ({ type, value, onChangeFunction }) =>
    <IonItem lines="none">
        <IonDatetime
            doneText={getDateTimeValues(type, 'doneText')}
            cancelText={getDateTimeValues(type, 'cancelText')}
            monthShortNames={getDateTimeValues(type, 'monthShortNames')}
            value={value}
            className="date_input"
            placeholder={getDateTimeValues(type, 'placeholder')}
            onIonChange={event => onChangeFunction(event.detail.value)}
        />
    </IonItem>
